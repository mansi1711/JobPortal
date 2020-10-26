var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session && req.session.isLoggedIn) {
    if (req.session.role == "employee") {
      // res.header(
      //   'Authorization', "Bearer " + userDetails.token
      // );
      res.redirect('/jobdetails/employee');
    }
    else {
      res.redirect('/jobdetails/manager');
    }
  }
  res.render('./../views/home', {
    loggedin: req.session.isLoggedIn,
    title: "Job Portal",
    isError: false
  });

});

module.exports = router;
