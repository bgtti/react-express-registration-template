/*
The library passport is being used to manage user authentication in this app.
This is the configuration file for passport.
More information available at: https://www.passportjs.org/
*/
//const { authenticate } = require('passport')
const bcrypt = require('bcrypt'); // for hashing
const LocalStarategy = require('passport-local').Strategy //using the local version of passport

function initialize(passport, getUserByEmail, getUserById) {
 const authenticateUser = async (email, password, done) => {
  const user = getUserByEmail(email)
  if (user == null) {
   return done(null, false, { message: 'No user with that email.' })
  }

  try {
   if (await bcrypt.compare(password, user.password)) {
    return done(null, user)
   } else {
    return done(null, false, { message: 'Password incorrect.' })
   }
  } catch (error) {
   return done(error)
  }

 }
 passport.use(new LocalStarategy({ usernameField: 'email' }, authenticateUser))
 passport.serializeUser((user, done) => { done(null, user.id) })
 passport.deserializeUser((id, done) => {
  return done(null, getUserById(id))
 })

}

module.exports = initialize