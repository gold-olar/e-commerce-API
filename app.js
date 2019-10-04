const cookieParser = require('cookie-parser');
const express = require('express');
const httpErrors = require('http-errors');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const db = require('./config/database');
require("dotenv").config();
const cors = require('cors');


mongoose.connect(db.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true },)
.then(connected => console.log('DB checked...'))
.catch(err => console.log(err));
mongoose.set("useCreateIndex", true);


const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
