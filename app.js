var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');
require('dotenv').config();
require('./services/auth/passport');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var dbConfig = require('./models/database-config');
var { User } = require('./models/user');

var indexRouter = require('./routes/index');
var signUpRouter = require('./routes/signup');
var transferRouter = require('./routes/transfer');

var app = express();
mongoose.connect(
  dbConfig.database,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) console.log(err);
    else console.log('Mongoose connected');
  }
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret-key'));
app.use(
  session({
    secret: 'secured_key',
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', indexRouter);
app.use('/signup', signUpRouter);
app.use('/transfer', transferRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
app.listen(parseInt(process.env.PORT), () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
