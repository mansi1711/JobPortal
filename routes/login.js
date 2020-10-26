var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user');


/* GET login page. */
router.get('/', function (req, res, next) {
  var msg = "";
  var username = "";
  var password = "";
  if (req.session.message && req.session.message.includes("Error")) {
    msg = req.session.message;
    username = req.query.username;
    password = req.query.password;
    req.session.message = "";
  }
  res.render('./../views/useroperations/login', { title: 'Job Portal', loggedin: false, message: msg, username: username, password: password });
});

/* Login user */
router.post(
  '/user',
  passport.authenticate('local', { session: false, failWithError: true }),
  function (req, res, next) {

    var userDetails = req.user.toAuthJson();

    req.session.userId = userDetails._id;
    req.session.userName = userDetails.username;
    req.session.isLoggedIn = true;
    req.session.role = userDetails.role;
    req.session.token = userDetails.token;

    if (userDetails.role == "employee") {
      res.redirect('/jobdetails/employee');
    }
    else {
      res.redirect('/jobdetails/manager');
    }
  }
  , function (err, req, res, next) {
    if (req.authError) {
      req.session.message = req.authError;
      res.redirect('/login');
    }
    else {
      req.session.message = "Error: Username and password field cannot be empty";
      var query = "";
      if (req.body.username != "")
        query = "?username=" + req.body.username;
      if (req.body.password != "")
        query = "?password=" + req.body.password;
      res.redirect('/login' + query);
    }
  }
);

module.exports = router;