const User = require('../models/User');

// npm i jsonwebtoken
const jwt = require('jsonwebtoken');

// handle errors
const handleErros = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: ''};

  // duplicate error code
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    // console.log(Object.values(err.errors));
  /*
    Object.values(err.errors).forEach(error => {
      console.log(error.properties)
    })
  }
  */
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
  }
    return errors;
}
const maxAge = 3 * 24 * 60 * 60; // 3 days in second unlike cookies which is in mil sec
const createToken = (id) => {
  //              header        payload
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge // this token is valid for 3 days 
  }); // this function returns a token with a signature
}

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(201).json({ user: user._id });
  }
  catch (err) {
    const errors = handleErros(err);
    res.status(400).json({ errors });
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.login(email, password);
    res.status(200).json({ user: user._id })
  }
  catch (err) {
    res.status(400).json({})
  }
}