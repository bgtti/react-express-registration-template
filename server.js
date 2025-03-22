// Storing users in  array here instead of in a db for now
const users = [
 {
  id: '1',
  name: 'n',
  email: 'n@n',
  password: '$2b$10$lwM3Pq9uKhH3t0Xhd1pb9OLDtyYsFoyLqLmwkU9pPh3300b.ncg8q'
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
 saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Routes

// Homepage
app.get('/', (req, res) => {
 res.render('index.ejs');
});

// Signup page
app.get('/signup', checkNotAuthenticated, (req, res) => {
 res.render('signup.ejs');
});

app.post('/signup', checkNotAuthenticated, async (req, res) => {
 try {
  const hashedPw = await bcrypt.hash(req.body.password, 10)

  //simulating db entry
  users.push({
   id: Date.now().toString(),
   name: req.body.name,
   email: req.body.email,
   password: hashedPw
  })
  res.redirect('/login') //if response successfull, redirect to login page
 } catch (error) {
  res.redirect('/signup') //if response not successfull, redirect to signup page
 }
 console.log(users)
})

// Login page
app.get('/login', checkNotAuthenticated, (req, res) => {
 res.render('login.ejs');
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
 successRedirect: '/dashboard',
 failureRedirect: '/login',
 //failureMessage: 'this is a failure' //get the failure message
}))

// Logout
app.post('/logout', checkAuthenticated, (req, res) => {
 req.logOut()
 res.redirect('/login')
})

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