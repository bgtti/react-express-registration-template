// Storing users in  array here instead of in a db for now
const users = [
 {
  id: '1',
  name: 'John',
  email: 'j@j',
  password: '$2b$10$vc/xWBp0i/H2ZKRfQTpnweHnVQYxCeL.9XKhywA9eQUmcEMQVNUg.' // test password = jjjjjjjj
 }
]

// Loading environment variables into process.env
if (process.env.NODE_ENV !== 'production') {
 require('dotenv').config()
}

const express = require('express');
const app = express();
const bcrypt = require('bcrypt'); // for hashing
const passport = require('passport');//for authentication
const session = require('express-session'); // for session


const initializePassport = require('./passport-config');
initializePassport(
 passport,
 email => users.find(user => user.email === email),
 id => users.find(user => user.id === id)
)

// Setup
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(session({
 secret: process.env.SESSION_SECRET,
 resave: false,
 saveUninitialized: false,
 cookie: {
  maxAge: null // default: session cookie (expires when browser closes), if "remember me" is checked, expires after 30 days
 }
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public')); // access to css files

// ROUTES

// Homepage
app.get('/', (req, res) => {
 res.render('index.ejs');
});

// Terms of service page
app.get('/terms', (req, res) => {
 res.render('terms.ejs');
});

// Signup page
app.get('/signup', checkNotAuthenticated, (req, res) => {
 res.render('signup', { error: null });
});

app.post('/signup', checkNotAuthenticated, async (req, res) => {
 const { name, email, "new-password": newPassword, "repeat-password": repeatPassword } = req.body;

 try {
  if (name.length > 100 || name.length < 1) {
   return res.render('signup', { error: "Name must be between 1 and 100 characters." });
  }

  if (!email.includes("@")) {
   return res.render('signup', { error: "Invalid email address." });
  }

  if (newPassword !== repeatPassword) {
   return res.render('signup', { error: "Passwords do not match." });
  }

  if (newPassword.length < 8 || newPassword.length > 60) {
   return res.render('signup', { error: "Password must be between 8 and 60 characters." });
  }

  const hashedPw = await bcrypt.hash(newPassword, 10);

  users.push({
   id: Date.now().toString(),
   name,
   email,
   password: hashedPw
  });

  res.redirect('/login');
 } catch (error) {
  console.error(error);
  res.render('signup', { error: "Something went wrong. Please try again." });
 }
});

// Login page
app.get('/login', checkNotAuthenticated, (req, res) => {
 res.render('login.ejs', { error: null });
});


app.post('/login', checkNotAuthenticated, (req, res, next) => {
 console.log("🟡 POST /login hit");

 passport.authenticate('local', (err, user, info) => {
  if (err) {
   console.log("🔴 Error in authentication:", err);
   return next(err);
  }

  if (!user) {
   console.log("🟠 No user returned:", info?.message);
   return res.render('login', { error: info?.message });
  }

  req.logIn(user, (err) => {
   if (err) {
    console.log("🔴 Error in req.logIn:", err);
    return next(err);
   }

   console.log("🟢 User logged in:", user.name);
   console.log("🔐 Session:", req.session);
   return res.redirect('/dashboard');
  });
 })(req, res, next);
});

// Logout
app.post('/logout', checkAuthenticated, (req, res, next) => {
 req.logout(function (err) {
  if (err) { return next(err); }
  res.redirect('/login');
 });
});

// Dashboard page = authenticated users only
app.get('/dashboard', checkAuthenticated, (req, res) => {
 res.render('dashboard.ejs', { name: req.user.name });
});

// Middleware: check for authenticated users
// Accessing the dashboard should only be possible if user is authenticated
function checkAuthenticated(req, res, next) {
 if (req.isAuthenticated()) {
  return next()
 }
 res.redirect('/login')
}

// Middleware: check for non-authenticated
// Accessing login and signup pages only make sense if the user is not already authenticated
function checkNotAuthenticated(req, res, next) {
 if (req.isAuthenticated()) {
  return res.redirect('/dashboard')
 }
 next()
}

// Running server
app.listen(3000, () => {
 console.log('Server is running on http://localhost:3000');
});