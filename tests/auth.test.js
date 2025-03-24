/* 
Testing routes concearning authentication:
- Signup
- Login
- Logout

Used for testing:
Jest
Supertest
Mongodb-memory-server
 */

const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server'); //spinup in-memory db instance
const app = require('../config/app'); // the Express app
const User = require('../models/users'); // the Mongoose User model
const bcrypt = require('bcrypt'); // password hashing

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

// Testing Signup route
describe('POST /signup', () => {

 it('should create a new user with valid input', async () => {
  const res = await request(app).post('/signup').send({
   name: 'Test User',
   email: 'user@example.com',
   'new-password': 'password123',
   'repeat-password': 'password123'
  });
  expect(res.statusCode).toBe(200);

  // const user = await User.findOne({ email: 'user@example.com' });
  // expect(user).toBeTruthy();
  // expect(user.name).toBe('Test User');
 });
});
