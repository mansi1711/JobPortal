var express = require('express');
var router = express.Router();
const validator = require('../middlewares/registervalidator');
const { validationResult } = require('express-validator');
const User = require('../models/user');
var multer = require('multer');
const path = require('path');
var imagefilter = require('./imagefilter')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

/* Register a new user */
router.post('/new', validator.validate(), async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsArray = errors.array();
    console.log(errorsArray)
    let message = "Error: ";
    let query = "?";
    errorsArray.forEach(function (error, i) {
      message += (i + 1) + ")" + error.msg + "  ";
    });
    if (req.body.username != "")
      query += "username=" + req.body.username;
    if (req.body.password != "")
      query += "&password=" + req.body.password;
    if (req.body.role != "" && (req.body.role == "employee" || req.body.role == "manager"))
      query += "&role=" + req.body.role;

    req.session.message = message;
    res.redirect('/register' + query);
    return;
  }

  User.findOne(
    {
      username: req.body.username, role: req.body.role
    },
    (err, user) => {
      if (err) {
        console.log('Error while creating user: ', err);
        req.session.message = "Error while creating user";
        return res.redirect('/error');
      }

      if (user) {
        console.log('Username already exists: ');
        req.session.message = "Username already exists";
        return res.redirect('/error');
      }

    }
  );

  const user = new User(req.body);
  await user.setHashedPassword();

  user.save((err, savedUser) => {
    if (err) {
      console.log('Error while creating user: ', err);
      req.session.message = "Error while creating user";
      res.redirect('/error');
    }
    res.render('./../views/useroperations/upload', { title: 'Job Portal', loggedin: req.session.isLoggedIn, message: "", username: req.body.username, password: req.body.password });
  });

});

/* Upload profile pic */
router.post('/upload', function (req, res, next) {
  let upload = multer({ storage: storage, fileFilter: imagefilter.imageFilter }).single('profile_pic');
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any
    let failed = false;
    if (req.fileValidationError) {
      console.log(req.fileValidationError);
      message = req.fileValidationError;
      failed = true;
    }
    else if (!req.file) {
      console.log("Please select an image to upload");
      message = "Please select an image to upload";
      failed = true;
    }
    else if (err) {
      console.log("Error while uploading image", err);
      message = "Error while uploading image";
      failed = true;
    }
    if (failed) {
      res.render('./../views/useroperations/upload', { title: 'Job Portal', loggedin: req.session.isLoggedIn, message: message, username: req.body.username, password: req.body.password });
    }
    res.render('./../views/useroperations/login', { title: 'Job Portal', loggedin: false, message: "Registration Successful !! Enter Credentials to Login", username: req.body.username, password: "" });
  });
});

/* GET register page. */
router.get('/', function (req, res, next) {
  var msg = "";
  var username = "";
  var password = "";
  var role = "";
  if (req.session.message && req.session.message.includes("Error")) {
    msg = req.session.message;
    username = req.query.username;
    password = req.query.password;
    role = req.query.role;
    req.session.message = "";
  }
  res.render('./../views/useroperations/register', { title: 'Job Portal', loggedin: req.session.isLoggedIn, message: msg, username: username, password: password, role: role });
});

module.exports = router;