/* 
App main configuration file.

Make sure you have added a .env file to the root directory.
You may copy the text from the .env.example file, but do not forget to adapt the values.
 */

require('dotenv').config(); // Loading environment variables into process.env
const express = require('express');
const cors = require('cors'); // required to send server-side cookies
const session = require('express-session'); // server-side session
const passport = require('passport'); // for authentication
const MongoStore = require('connect-mongo'); // for session store
const initializePassport = require('./passport-config'); // configuring authentication

const app = express();

// Passport
initializePassport(passport);

// Middleware setup
app.use(express.json()); // Parses JSON bodies (eg from JavaScript/React requests).
app.use(express.urlencoded({ extended: false })); // parses URL-encoded bodies (form data submitted via <form> in HTML)
app.use(cors({
 origin: 'http://localhost:5173', // React app's origin
 credentials: true
}));

const sessionConfig = {
 secret: process.env.SESSION_SECRET,
 resave: false,
 saveUninitialized: false,
 cookie: {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax', // or 'none' if cross-site
  maxAge: null // will be set dynamically if "remember" is checked
 }
}
// Only add MongoStore if NOT in test environment
if (process.env.NODE_ENV !== 'test') {
 sessionConfig.store = MongoStore.create({
  mongoUrl: process.env.DATABASE_URL
 });
}

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public')); // access to css files

// Routes
const authRoutes = require('../routes/auth'); // auth routes
app.use('/api', authRoutes);

// Export app config
module.exports = app;