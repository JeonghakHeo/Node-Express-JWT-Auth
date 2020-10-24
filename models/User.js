const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    // control custom error message when fail
    required: [true, 'Please enter an email'],
    // only 1 unique email is allowed to be created
    unique: true,
    lowercase: true,
    
    // val is email
    // npm install validator --save
    // validate: [(val) => { use regex to validate emails if valid, return true }, 'Please enter a valid email']
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true,'Please enter an password'],
    minlength: [6, 'Minimum password length is 6 characters']
  }
});

// fire a function after doc saved to db
userSchema.post('save', function (doc, next) {
  console.log('new user was created & saved', doc);
  next();
});

// fire a function before doc saved to db
userSchema.pre('save', function (next) {
  console.log('user about to be created', this)
  next();
});

// model('user') <- singular
const User = mongoose.model('user', userSchema);

module.exports = User;