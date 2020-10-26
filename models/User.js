const mongoose = require('mongoose');
const { isEmail } = require('validator');
// npm install bcrypt
const bcrypt = require('bcrypt');

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

// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt); // this <- refers to the instance of the user we are trying to create 
  next();
});

// model('user') <- singular
const User = mongoose.model('user', userSchema);

module.exports = User;