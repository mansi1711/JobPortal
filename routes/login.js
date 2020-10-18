var express = require('express');
var router = express.Router();
const passport = require('passport');

const User = require('../models/user');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('./../views/useroperations/login', { title: 'Job Portal', loggedin: false });
});

/* Login user */
router.post(
    '/user',
    passport.authenticate('local', { session: false }),
    function (req, res, next) {

      var userDetails = req.user.toAuthJson();

      req.session.userId = userDetails._id;
      req.session.isLoggedIn = true;
      req.session.role = userDetails.role;
      req.session.token = userDetails.token;

      if(userDetails.role == "employee"){
        // res.header(
        //   'Authorization', "Bearer " + userDetails.token
        // );
        res.redirect('/jobdetails/employee');
      }
      else{
        res.redirect('/jobdetails/manager');
      }

    }
  );

module.exports = router;