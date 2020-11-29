var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookiesMiddleware = require('universal-cookie-express');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var testAPIRouter = require('./routes/testAPI');
var userRouter = require('./routes/user');
var expenseRouter = require('./routes/expense');
var incomeRouter = require('./routes/income');
var categoriesRouter = require('./routes/categories');
var frequenciesRouter = require('./routes/frequencies');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookiesMiddleware());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/testAPI', testAPIRouter);
app.use('/user', userRouter);
app.use('/expense', expenseRouter);
app.use('/income', incomeRouter);
app.use('/categories', categoriesRouter);
app.use('/frequencies', frequenciesRouter);

app.get('/', function(request, response, next) {
  response.json({msg: 'This is CORS-enabled for all origins.'})
})

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
