/* 
Routes concearning authentication:
- Signup
- Login
- Logout
- Get user (to re-log user in from frontend if required)
- Delete (own account)
 */
const express = require('express');
const bcrypt = require('bcrypt'); // for hashing
const passport = require('passport');// for authentication
const User = require('../models/users')// db
const checkAuthenticated = require('../middleware/authMiddleware');// middleware functions
const { INPUT_LENGTH } = require('../utils/constants.js');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
 const { name, email, password } = req.body;

 console.log(`New signup requested: ${email}.`)

 try {
  if (!name || name.length < INPUT_LENGTH.name.minValue || name.length > INPUT_LENGTH.name.maxValue) {
   return res.status(400).json({ error: `Name must be between ${INPUT_LENGTH.name.minValue} and ${INPUT_LENGTH.name.maxValue} characters.` });
  }

  if (!email || !email.includes('@') || email.length < INPUT_LENGTH.email.minValue || email.length > INPUT_LENGTH.email.maxValue) {
   return res.status(400).json({ error: 'Invalid email address.' });
  }

  if (!password || password.length < INPUT_LENGTH.password.minValue || password.length > INPUT_LENGTH.password.maxValue) {
   return res.status(400).json({ error: `Password must be between ${INPUT_LENGTH.password.minValue} and ${INPUT_LENGTH.password.maxValue} characters.` });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
   return res.status(400).json({ error: 'Email already registered.' });
  }

  const hashedPw = await bcrypt.hash(password, 10);

  const newUser = new User({
   name,
   email,
   password: hashedPw,
  });
  await newUser.save();

  console.log(`New signup: ${email}.`)

  return res.status(201).json({ message: 'User created successfully. Please log in.' });
 } catch (err) {
  console.error(`New signup failed: ${err}`)
  return res.status(500).json({ error: 'Something went wrong. Please try again.' });
 }
});

// Login route
router.post('/login', (req, res, next) => {

 console.log("Login requested")

 passport.authenticate('local', (err, user, info) => {
  if (err) return next(err);

  if (!user) {
   return res.status(401).json({ error: info?.message || 'Invalid credentials' });
  }

  req.logIn(user, (err) => {
   if (err) return next(err);

   if (req.body.remember) {
    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
   }

   console.log(`New login.`)
   return res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  });
 })(req, res, next);
});

// Logout route
router.post('/logout', checkAuthenticated, (req, res, next) => {
 req.logout((err) => {
  if (err) return next(err);

  console.log(`New logout.`)
  req.session.destroy(() => {
   res.clearCookie('connect.sid'); // default cookie name
   res.status(200).json({ message: 'Logged out successfully' });
  });
 });
});

// Check current authenticated user
router.get('/me', checkAuthenticated, (req, res) => {
 console.log(`Request to get user received.`)
 const { name, email } = req.user;
 res.status(200).json({ authenticated: true, user: { name, email } });
});

// Delete own account
router.delete('/deleteMe', checkAuthenticated, async (req, res) => {
 console.log(`Request to delete user received.`)

 try {
  await User.findByIdAndDelete(req.user._id);

  req.logout((err) => {
   if (err) {
    console.error("Logout error after account deletion:", err);
    return res.status(500).json({ error: 'Error during logout.' });
   }

   req.session.destroy(() => {
    res.clearCookie('connect.sid'); // Adjust cookie name if custom
    console.log(`Account deleted successfully.`)
    return res.status(200).json({ message: 'Account deleted and logged out successfully.' });
   });
  });
 } catch (err) {
  console.error("❌ Account deletion error:", err);
  return res.status(500).json({ error: 'Something went wrong while deleting your account.' });
 }
});

module.exports = router;