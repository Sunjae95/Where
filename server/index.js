const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const cors =require('cors');
const logger = require('morgan');


const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({ origin: ['http://localhost:3000'], credentials: true}))  //CORS 이슈 해결
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', require('./routes/map'));
app.use('/api/search', require('./routes/search.js'));

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

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Listening on: http://localhost:${port}`)
});

module.exports = app;
