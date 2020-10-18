const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JobSchema = new Schema({
  project_name: String,
  client_name: String,
  technologies: String,
  role: String,
  job_description: String,
  status: String,
  created_by: String
});



module.exports = mongoose.model('Job', JobSchema);
