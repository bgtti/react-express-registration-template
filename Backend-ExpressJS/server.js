/* 
Starts the server from app configuration
 */
const app = require('./config/app');
const mongoose = require('mongoose'); // database

// Start DB
mongoose.connect(process.env.DATABASE_URL)
 .then(() => console.log('Connected to db'))
 .catch(err => console.error('❌ Failed to connect to MongoDB:', err));

// Start app
app.listen(3000, () => {
 console.log('Server is running on http://localhost:3000');
});