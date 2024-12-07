const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }, // Store hashed passwords

  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  }, // Role-based access

  profileImageUrl: {
    type: String
  }
})

const User = model('User', userSchema)

module.exports = User
