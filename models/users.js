/* 
DB model for users
 */
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
 name: {
  type: String,
  required: true
 },
 email: {
  type: String,
  required: true
 },
 password: {
  type: String,
  required: true
 },
 creationDate: {
  type: Date,
  required: true,
  default: Date.now
 }
})

module.exports = mongoose.model('User', userSchema)