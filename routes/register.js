var express = require('express');
var router = express.Router();

const User = require('../models/user');

/* Register a new user */
router.post('/new', async function (req, res, next) {
  console.log(JSON.stringify(req.body))
  const user = new User(req.body);
  await user.setHashedPassword();

  user.save((err, savedUser) => {
    if (err) {
      console.log('Error while creating a user: ', err);
    }

    res.redirect(307, '/login/user');
  });
});

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('./../views/useroperations/register', { title: 'Job Portal' , loggedin: req.session.isLoggedIn});
});

module.exports = router;