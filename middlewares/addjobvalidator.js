const { body } = require('express-validator')

exports.validate = () => {

   return [
      body('project_name', 'Enter Project Name').exists().notEmpty(),
      body('client_name', 'Enter Client Name').exists().notEmpty(),
      body('technologies', 'Enter Technologies').exists().notEmpty(),
      body('role', 'Enter Role').exists().notEmpty(),
      body('job_description', 'Enter Job Description').exists().notEmpty(),
      body('status', 'Enter Status').exists().notEmpty(),
      body('status', 'Status can be open or closed').exists().isIn(['open', 'closed'])
   ]
}