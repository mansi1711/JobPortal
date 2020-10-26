const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

function isAuthenticatedManager(req, res, next) {
  let token = req.session.token;
  try {
    jwt.verify(token, process.env.JWT_SECRET_MANAGER);
  } catch (err) {
    res.render('./../views/home', {
      loggedin: req.session.isLoggedIn,
      userName: req.session.userName,
      role: req.session.role,
      title: "Job Portal",
      isError: true,
      message: "Unauthorized !!"
    });
  }

  next();

  // return expressJwt({ secret: process.env.JWT_SECRET_MANAGER, algorithms: ['HS256'] });
}

function isAuthenticatedEmployee(req, res, next) {
  let token = req.session.token;
  try {
    jwt.verify(token, process.env.JWT_SECRET_EMPLOYEE);
  } catch (err) {
    res.render('./../views/home', {
      loggedin: req.session.isLoggedIn,
      userName: req.session.userName,
      role: req.session.role,
      title: "Job Portal",
      isError: true,
      message: "Unauthorized !!"
    });
  }

  next();

}

module.exports = {
  isAuthenticatedManager,
  isAuthenticatedEmployee,
};
