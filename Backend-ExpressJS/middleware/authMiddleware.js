/* 
Middleware function checking if user is authenticated.
(Accessing the dashboard should only be possible if user is authenticated)
 */
function checkAuthenticated(req, res, next) {
 if (req.isAuthenticated()) return next();

 return res.status(403).json({ error: 'Not authenticated' });
}

module.exports = checkAuthenticated;