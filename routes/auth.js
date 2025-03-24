/* 
Routes concearning authentication:
- Signup
- Login
- Logout
 */
const express = require('express');
const bcrypt = require('bcrypt'); // for hashing
const passport = require('passport');// for authentication
const User = require('../models/users')// db
const { checkAuthenticated, checkNotAuthenticated } = require('../middleware/authMiddleware');// middleware functions

const router = express.Router();

// Signup page
router.get('/signup', checkNotAuthenticated, (req, res) => {
 res.render('signup', { error: null });
});

// Signup route
router.post('/signup', checkNotAuthenticated, async (req, res) => {
 const { name, email, "new-password": newPassword, "repeat-password": repeatPassword } = req.body;
 try {
  if (!name || name.length < 1 || name.length > 100)
   return res.render('signup', { error: "Name must be between 1 and 100 characters." });

  if (!email || !email.includes("@"))
   return res.render('signup', { error: "Invalid email address." });

  if (!newPassword || newPassword.length < 8 || newPassword.length > 60)
   return res.render('signup', { error: "Password must be between 8 and 60 characters." });

  if (!repeatPassword || newPassword !== repeatPassword)
   return res.render('signup', { error: "Passwords do not match." });

  const existingUser = await User.findOne({ email }); // check if email already registered
  if (existingUser)
   return res.render('signup', { error: "Email already registered." });

  const hashedPw = await bcrypt.hash(newPassword, 10);

  const newUser = new User({
   name,
   email,
   password: hashedPw
  });
  await newUser.save(); // Save user to DB

  res.redirect('/login');
 } catch (err) {
  console.error(err);
  res.render('signup', { error: "Something went wrong. Please try again." });
 }
});

// Login page
router.get('/login', checkNotAuthenticated, (req, res) => {
 res.render('login.ejs', { error: null });
});

// Login route
router.post('/login', checkNotAuthenticated, (req, res, next) => {
 passport.authenticate('local', (err, user, info) => {
  if (err) return next(err);
  if (!user) return res.render('login', { error: info?.message });

  req.logIn(user, err => {
   if (err) return next(err);

   if (req.body.remember) {
    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
   }

   res.redirect('/dashboard');
  });
 })(req, res, next);
});

// Logout route
router.post('/logout', checkAuthenticated, (req, res, next) => {
 req.logout(err => {
  if (err) return next(err);
  res.redirect('/login');
 });
});

// Delete own account
router.post('/deleteAccount', checkAuthenticated, async (req, res) => {
 try {
  // Assuming you're using Mongoose and the req.user object is populated by Passport
  await User.findByIdAndDelete(req.user._id);

  // Log the user out after deletion
  req.logout(err => {
   if (err) return res.status(500).send("Error during logout.");
   res.redirect('/signup'); // or homepage
  });
 } catch (err) {
  console.error("❌ Account deletion error:", err);
  // res.status(500).send("Something went wrong while deleting your account.");
 }
});

module.exports = router;