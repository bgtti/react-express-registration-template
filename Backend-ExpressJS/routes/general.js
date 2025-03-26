/* 
Routes serving general website pages:
- Index (Homepage)
- Terms
- Dashboard (authentication required to access)
 */
const express = require('express');
const { checkAuthenticated } = require('../middleware/authMiddleware');// middleware functions

const router = express.Router();

// Homepage
router.get('/', (req, res) => {
 res.render('index.ejs');
});

// Terms and conditions
router.get('/terms', (req, res) => {
 res.render('terms.ejs');
});

// User dashboard
router.get('/dashboard', checkAuthenticated, (req, res) => {
 res.render('dashboard.ejs', { name: req.user.name });
});

module.exports = router;