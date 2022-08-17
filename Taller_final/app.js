var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config({
  path: `./environments/${process.env.SCOPE === 'development' ? process.env.SCOPE : 'production'}.env`
});


//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
const mongoose = require('mongoose');

var app = express();

/**
 * Conection BD
 */
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log(err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * rutas sin usar, default
 */
// app.use('/', require('./routes/index'));
// app.use('/users', require('./routes/users'));


/**
 * Rutas del proyecto
 * GET /api/v1/users
 */
app.use('/api/v1', require('./controllers/get.users'));

/**
 * GET /api/v1/user/:id
 */
app.use('/api/v1', require('./controllers/get.user'));

/**
 * POST /api/v1/user
 */
app.use('/api/v1', require('./controllers/post.user'));

/**
 * PUT /api/v1/user/:id
 */
app.use('/api/v1', require('./controllers/put.user'));

/**
 * PATCH api/v1/user/:id
 */
app.use('/api/v1', require('./controllers/patch.user'));

/**
 * DELETE api/v1/user/:id
 */
app.use('/api/v1', require('./controllers/delete.user'));

/**
 * SHOW LOGIN
 */
app.use('/api/v1', require('./controllers/showLogin'));

/**
 * REGISTER ACCOUNT
 */
app.use('/api/v1', require('./controllers/showRegister'));

/**
 * ROOM
 */
app.use('/api/v1', require('./controllers/showBingoRoom'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
