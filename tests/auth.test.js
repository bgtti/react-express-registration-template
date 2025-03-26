/* 
Testing routes concearning authentication:
- Signup
- Login

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

// Reset db between tests
afterEach(async () => {
 const collections = mongoose.connection.collections;
 for (const key in collections) {
  await collections[key].deleteMany({});
 }
});

//Signup test
describe('POST /signup', () => {

 describe("given a name, email and password", () => {
  test("should save user to db and redirect to login page", async () => {
   const response = await request(app)
    .post("/signup")
    .type('form') // server expects form data
    .send({
     name: 'Joanna Doe',
     email: 'user@example.com',
     'new-password': 'someFakePw123',
     'repeat-password': 'someFakePw123'
    })
    .expect(302) //redirection status code
    .expect('Location', '/login')

   //check if user is in db
   const users = await User.find()
   expect(users.length).toBe(1)
   const user = await User.findOne({ email: 'user@example.com' });
   expect(user.name).toBe('Joanna Doe');
  });

  test("should show error if passwords do not match", async () => {
   const response = await request(app)
    .post("/signup")
    .type('form') // important for form data
    .send({
     name: 'Jane Doe',
     email: 'jane@example.com',
     'new-password': 'Password123',
     'repeat-password': 'NotTheSame123'
    });

   expect(response.status).toBe(200); // not redirecting
   expect(response.text).toContain("Passwords do not match.");
  });
 });
});

//Login test
describe('POST /login', () => {

 describe("given an email and password", () => {
  test("should redirect to dashboard page if user exists", async () => {
   // add user
   const hashedPw = await bcrypt.hash('ValidPassword123', 10);
   await User.create({
    name: 'Jane Login',
    email: 'login@example.com',
    password: hashedPw
   });

   const response = await request(app)
    .post("/login")
    .type('form') // server expects form data
    .send({
     email: 'login@example.com',
     password: 'ValidPassword123'
    })
    .expect(302) //redirection status code
    .expect('Location', '/dashboard')
  });

  test("should not redirect if password is wrong", async () => {
   // add user
   const hashedPw = await bcrypt.hash('ValidPassword123', 10);
   await User.create({
    name: 'John Login',
    email: 'john@example.com',
    password: hashedPw
   });

   const response = await request(app)
    .post("/login")
    .type('form') // server expects form data
    .send({
     email: 'john@example.com',
     password: 'NotValidPassword123'
    })
    .expect(200) // no redirection
  });

 });

});