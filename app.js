const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var session = require('express-session');

require('./config/passport');

const auth = require('./middlewares/auth');

var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var jobDetailsRouter = require('./routes/jobdetails');
var addJobRouter = require('./routes/addjob');
var logoutRouter = require('./routes/logout');

const db = require('./database/db');
db.connectToDatabase(process.env.DB_URL);

var app = express();

app.set('view engine', 'ejs');

app.use(session(
    {
      secret: 'session_secret',
      key: 'session_key',
      cookie: {
        httpOnly: false
      },
      resave: true,
      saveUninitialized: true
    }
  ));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/jobdetails', jobDetailsRouter);
app.use('/addjob', addJobRouter);
app.use('/logout', logoutRouter);

module.exports = app;
