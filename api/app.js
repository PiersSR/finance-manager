var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookiesMiddleware = require('universal-cookie-express');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var addIncomeRouter = require('./routes/addIncome');
var addExpenseRouter = require('./routes/addExpense');
var addUserRouter = require('./routes/addUser');
var getIncomeRouter = require('./routes/getIncome');
var getCategoriesRouter = require('./routes/getCategories');
var getFrequenciesRouter = require('./routes/getFrequencies');
var getSummaryRouter = require('./routes/getSummary');
var getIncomeAndExpensesRouter = require('./routes/getIncomeAndExpenses');
var getNextUserIdRouter = require('./routes/getNextUserId');

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
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/addIncome', addIncomeRouter);
app.use('/addExpense', addExpenseRouter);
app.use('/getIncome', getIncomeRouter);
app.use('/getCategories', getCategoriesRouter);
app.use('/getFrequencies', getFrequenciesRouter);
app.use('/getSummary', getSummaryRouter);
app.use('/getIncomeAndExpenses', getIncomeAndExpensesRouter);
app.use('/getNextUserId', getNextUserIdRouter);
app.use('/addUser', addUserRouter);


app.get('/', function(request, response, next) {
  response.json({msg: 'This is CORS-enables for all origins.'})
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
