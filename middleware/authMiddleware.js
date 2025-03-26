/* 
Middleware functions checking if user is authenticated
 */

// Middleware: check for authenticated users
// Accessing the dashboard should only be possible if user is authenticated
function checkAuthenticated(req, res, next) {
 if (req.isAuthenticated()) return next();
 res.redirect('/login');
}

// Middleware: check for non-authenticated
// Accessing login and signup pages only make sense if the user is not already authenticated
function checkNotAuthenticated(req, res, next) {
 if (req.isAuthenticated()) return res.redirect('/dashboard');
 next();
}

module.exports = {
 checkAuthenticated,
 checkNotAuthenticated
};