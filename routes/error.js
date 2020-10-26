var express = require('express');
var router = express.Router();

/* GET error page. */
router.get('/', function (req, res, next) {
  let msg = "";
  if (req.session.message) {
    msg = req.session.message;
  }
  else {
    msg = "Invalid URL";
  }
  req.session.message = "Invalid URL";
  res.render('./../views/home', {
    loggedin: req.session.isLoggedIn,
    userName: req.session.userName,
    role: req.session.role,
    title: "Job Portal",
    isError: true,
    message: msg
  });
});

module.exports = router;