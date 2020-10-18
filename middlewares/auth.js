const expressJwt = require('express-jwt');

function isAuthenticatedManager() {
  return expressJwt({ secret: process.env.JWT_SECRET_MANAGER, algorithms: ['HS256'] });
}

function isAuthenticatedEmployee() {
  return expressJwt({ secret: process.env.JWT_SECRET_EMPLOYEE, algorithms: ['HS256'] });
}

module.exports = {
  isAuthenticatedManager,
  isAuthenticatedEmployee,
};
