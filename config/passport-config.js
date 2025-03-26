/*
The library passport is being used to manage user authentication in this app.
This is the configuration file for passport.
More information available at: https://www.passportjs.org/
*/
const bcrypt = require('bcrypt'); // for hashing
const LocalStrategy = require('passport-local').Strategy //using the local version of passport
const User = require('../models/users'); // adjust path if needed

function initialize(passport) {
 const authenticateUser = async (email, password, done) => {
  try {
   const user = await User.findOne({ email: email });
   if (!user) {
    return done(null, false, { message: 'No user with that email' });
   }

   const match = await bcrypt.compare(password, user.password);
   if (match) {
    return done(null, user);
   } else {
    return done(null, false, { message: 'Incorrect password' });
   }
  } catch (err) {
   return done(err);
  }
 };

 passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

 passport.serializeUser((user, done) => {
  done(null, user.id);
 });

 passport.deserializeUser(async (id, done) => {
  try {
   const user = await User.findById(id);
   done(null, user);
  } catch (err) {
   done(err);
  }
 });
}

module.exports = initialize