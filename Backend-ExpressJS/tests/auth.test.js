/* 
Testing routes concearning authentication:
- Signup
- Login
- Logout
- Me (user info from cookie)
- DeleteMe (delete user's account)

Used for testing:
Jest
Supertest
Mongodb-memory-server

Run tests from the root folder using the command: npm test

More information about how to setup testing:
https://mayallo.com/unit-integration-e2e-testing-using-jest/
 */

const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server'); //spinup in-memory db instance
const app = require('../config/app'); // the Express app
const User = require('../models/users'); // the Mongoose User model
const bcrypt = require('bcrypt'); // password hashing

// Test database configuration
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});// Reset db between tests
  }
});

//Signup test
describe('POST /signup', () => {

  describe("given a name, email and password", () => {
    test("should respond with 201 and save user to db", async () => {
      const response = await request(app)
        .post("/api/signup")
        .send({
          name: 'Joanna Doe',
          email: 'user@example.com',
          password: 'someFakePw123',
        })
      expect(response.status).toEqual(201); // resource created

      const user = await User.findOne({ email: 'user@example.com' });
      expect(user.name).toBe('Joanna Doe');

    });

    test("should return error if password too short", async () => {
      const response = await request(app)
        .post("/api/signup")
        .send({
          name: 'Jane Doe',
          email: 'jane@example.com',
          password: 'pass',
        });
      expect(response.status).toEqual(400); // client error
      const user = await User.findOne({ email: 'jane@example.com' });
      expect(user).toBeNull(); // user not saved to the db
    });

    test("should return error if email has wrong format", async () => {
      const response = await request(app)
        .post("/api/signup")
        .send({
          name: 'Jane Doe',
          email: 'janeexample.com',
          password: 'someFakePw123',
        });

      expect(response.status).toBe(400); // client error
    });
  });
});

// Login test
describe('POST /login', () => {

  describe("given an email and password", () => {

    //userObj shared in tests
    const userObj = {
      name: "Jane Login",
      email: "login@example.com",
      password: "ValidPassword123"
    }

    test("responds 200 and sends user data", async () => {
      // add user to db
      const hashedPw = await bcrypt.hash(userObj.password, 10);
      const user = {
        ...userObj,
        password: hashedPw
      };
      await User.create(user);

      const response = await request(app)
        .post("/api/login")
        .send({
          email: userObj.email,
          password: userObj.password
        })
      expect(response.status).toBe(200); // success
      expect(response.body.user).toEqual( //response.body.user in supertest, in react received as response.data.user
        expect.objectContaining({
          name: userObj.name,
          email: userObj.email
        })
      );

      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies.some(cookie => cookie.startsWith("connect.sid="))).toBe(true);

    });

    test("should return 401 if password incorrect", async () => {
      // add user to db
      const hashedPw = await bcrypt.hash(userObj.password, 10);
      const user = {
        ...userObj,
        password: hashedPw
      };
      await User.create(user);

      const response = await request(app)
        .post("/api/login")
        .send({
          email: userObj.email,
          password: "wrongPassword"
        })
      expect(response.status).toBe(401); // unauthorized
    });

  });

});

// Logout test
describe('POST /logout', () => {

  describe("a logged in user should be able to log out", () => {

    //userObj shared in tests
    const userObj = {
      name: "Jane Login",
      email: "login@example.com",
      password: "ValidPassword123"
    }

    test("session cookie should be cleared", async () => {
      // add user to db
      const hashedPw = await bcrypt.hash(userObj.password, 10);
      const user = {
        ...userObj,
        password: hashedPw
      };
      await User.create(user);

      //log user in first
      let agent = request.agent(app); //supertest agent should persist cookies across requests
      await agent.post("/api/login").send({
        email: user.email,
        password: userObj.password,
      });
      //then log user out
      const response = await agent.post("/api/logout");
      expect(response.status).toBe(200);

      //testing the cookie was deleted
      /**
       * BACKGROUD INFO
       * When the logout functions calls req.session.destroy() and res.clearCookie('connect.sid')
       * Express does not exactly just remove the cookie from the response headers, but instead
       * it sends a new Set-cookie header with the same cookie name, sets its value to empty or garbage
       * and sets an Expires date in the past.
       * This is how Browsers understands the cookie should be deleted. 
       */
      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();

      const sessionCookie = cookies.find((cookie) => cookie.startsWith("connect.sid=")); // new cookie

      expect(sessionCookie).toMatch(/connect\.sid=;/); // cookie is being cleared
      expect(sessionCookie).toMatch(/Expires=/); // some date in the past is set

    });

  });

});

// Get authenticated user test
describe('GET /me', () => {

  describe("a registered user should receive information", () => {

    //userObj shared in tests
    const userObj = {
      name: "Jane Login",
      email: "login@example.com",
      password: "ValidPassword123"
    }

    test("if a valid session exists", async () => {
      // add user to db
      const hashedPw = await bcrypt.hash(userObj.password, 10);
      const user = {
        ...userObj,
        password: hashedPw
      };
      await User.create(user);

      //log user in first
      let agent = request.agent(app); //supertest agent should persist cookies across requests
      await agent.post("/api/login").send({
        email: user.email,
        password: userObj.password,
      });

      //get user info
      const response = await agent.get("/api/me");
      expect(response.status).toBe(200);
      expect(response.body.user).toEqual( //response.body.user in supertest, in react received as response.data.user
        expect.objectContaining({
          name: userObj.name,
          email: userObj.email
        })
      );

      //logout user 
      await agent.post("/api/logout");

      //should no longer be able to get info
      const res = await request(app).get("/api/me")

      expect(res.status).toBe(403); // not authenticated (res from middleware)

    });

  });

});

// Delete user test
describe('DELETE /deleteMe', () => {

  describe("a logged in user with a valid session", () => {

    //userObj shared in tests
    const userObj = {
      name: "Jane Login",
      email: "login@example.com",
      password: "ValidPassword123"
    }

    test("should be able to delete account", async () => {
      // add user to db
      const hashedPw = await bcrypt.hash(userObj.password, 10);
      const user = {
        ...userObj,
        password: hashedPw
      };
      await User.create(user);

      //log user in first
      let agent = request.agent(app); //supertest agent should persist cookies across requests
      await agent.post("/api/login").send({
        email: user.email,
        password: userObj.password,
      });

      //delete account
      const response = await agent.delete("/api/deleteMe");
      expect(response.status).toBe(200);

      const deletedUser = await User.findOne({ email: userObj.email });
      expect(deletedUser).toBeNull(); // user deleted from db

    });

  });

});