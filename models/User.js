const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  phonenumber: {
    type: Number,
    required: true
  },
  dob: {
    type: Date,
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
  image: { 
    type: String, 
    default: 0
  },
  verified: { 
    type: Boolean, 
    default: false
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
