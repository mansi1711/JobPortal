const { body } = require('express-validator')

exports.validate = () => {

  return [
    body('username', 'Enter Username').exists().notEmpty(),
    body('password', 'Enter Password').exists().notEmpty(),
    body('role', 'Enter role').exists().notEmpty(),
    body('role', 'Role can be manager or employee').exists().isIn(['manager', 'employee']),
  ]
}