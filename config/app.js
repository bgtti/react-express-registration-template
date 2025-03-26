/* 
App main configuration file.

Make sure you have added a .env file to the root directory.
You may copy the text from the .env.example file, but do not forget to adapt the values.
 */

require('dotenv').config(); // Loading environment variables into process.env
const express = require('express');
const session = require('express-session'); // server-side session
const passport = require('passport'); // for authentication
const initializePassport = require('./passport-config'); // configuring authentication

const app = express();

// Passport
initializePassport(passport);

// Middleware setup
app.set('view engine', 'ejs');
app.use(express.json()); // Parses JSON bodies (eg from JavaScript/React requests).
app.use(express.urlencoded({ extended: false })); // parses URL-encoded bodies (form data submitted via <form> in HTML)
app.use(session({
 secret: process.env.SESSION_SECRET,
 resave: false,
 saveUninitialized: false,
 cookie: { maxAge: null }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public')); // access to css files

// Routes
const authRoutes = require('../routes/auth'); // auth routes
const generalRoutes = require('../routes/general'); // website general routes
app.use('/', generalRoutes);
app.use('/', authRoutes);

// Export app config
module.exports = app;