const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    // only 1 unique email is allowed to be created
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  }
});

// model('user') <- singular
const User = mongoose.model('user', userSchema);

module.exports = User;