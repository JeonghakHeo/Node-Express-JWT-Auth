const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));

/* it takes any json data that comes along with a request
   and it passes it into a javascript object so we can then use it inside the code
   and it attatches that object with that data to the *reqeust object*.
*/
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://charlie4142:tpdl3380@node-express-jwt-auth.zzprr.mongodb.net/node-auth?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

// cookies
app.get('/set-cookies', (req, res) => {

  //res.setHeader('Set-Cookie', 'newUser=true');

  res.cookie('newUser', false);
  // secure cookies will be set only over https, httpOnly cookies are not available to see from console.
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true });

  res.send('you got the cookies');

});

app.get('/read-cookies', (req, res) => {

  const cookies = req.cookies;
  console.log(cookies);

  res.json(cookies);

});