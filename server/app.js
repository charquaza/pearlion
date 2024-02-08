require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

const indexRouter = require('./routes/index');

const app = express();

//Configure cors
const corsOptions = {
   origin: 'http://localhost:3001', //restrict to frontend domain after deployment
   credentials: true,
   optionsSuccessStatus: 200
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors(corsOptions));

//Set up router
app.use('/', indexRouter);

// catch 404
app.use(function(req, res, next) {
   res.status(404).json({ errors: ['Not found'] });
});

// error handler
app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.json({ errors: [ err.message ] });
});

module.exports = app;