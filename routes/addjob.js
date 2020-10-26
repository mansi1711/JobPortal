var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
var events = require('events');
const Job = require('../models/job');
const AppliedJob = require('../models/appliedjob');
const validator = require('../middlewares/addjobvalidator');
const { validationResult } = require('express-validator');

var event_emitter = new events.EventEmitter();

/* Add a job opening */
router.post('/new', [auth.isAuthenticatedManager, validator.validate()], async function (req, res, next) {

  const errors = validationResult(req);
  console.log(req.body)
  if (!errors.isEmpty()) {
    let errorsArray = errors.array();
    console.log(errorsArray)
    let message = "Error: ";
    let query = "?";
    errorsArray.forEach(function (error, i) {
      message += (i + 1) + ")" + error.msg + "  ";
    });
    if (req.body.project_name != "")
      query += "project_name=" + req.body.project_name;
    if (req.body.client_name != "")
      query += "&client_name=" + req.body.client_name;
    if (req.body.technologies != "")
      query += "&technologies=" + req.body.technologies;
    if (req.body.role != "")
      query += "&job_role=" + req.body.role;
    if (req.body.job_description != "")
      query += "&job_description=" + req.body.job_description;
    if (req.body.status != "" && (req.body.status == "open" || req.body.status == "closed"))
      query += "&status=" + req.body.status;

    req.session.message = message;
    res.redirect('/addjob' + query);
    return;
  }

  const job = new Job(req.body);
  job.save((err, savedJob) => {
    if (err) {
      console.log('Error while creating a job: ', err);
      req.session.message = "Error while creating a job";
      res.redirect('/error');
    }

    res.render('./../views/home', {
      loggedin: req.session.isLoggedIn,
      userName: req.session.userName,
      role: req.session.role,
      title: "Job Portal",
      isError: true,
      message: "Job added !!"
    });
  });
});

/* Update a job opening */
router.post('/update', auth.isAuthenticatedManager, async function (req, res, next) {
  var query = { '_id': req.body.job_id };
  var newValues = { $set: { status: req.body.selectpicker } };
  Job.updateOne(query, newValues, function (err, result) {
    if (err) {
      console.log('Error while updating job status: ', err);
      req.session.message = "Error while updating job status";
      res.redirect('/error');
    }
    else {
      if (req.body.selectpicker == "closed") {
        event_emitter.emit('job_closed', req);
      }
      res.render('./../views/home', {
        loggedin: req.session.isLoggedIn,
        userName: req.session.userName,
        role: req.session.role,
        title: "Job Portal",
        isError: true,
        message: "Job status updated !!"
      });
    }
  });
});

/* Add job page. */
router.get('/', auth.isAuthenticatedManager, function (req, res, next) {
  var msg = "";
  var project_name = "";
  var client_name = "";
  var technologies = "";
  var job_role = "";
  var job_description = "";
  var status = "";
  if (req.session.message && req.session.message.includes("Error")) {
    msg = req.session.message;
    project_name = req.query.project_name;
    client_name = req.query.client_name;
    technologies = req.query.technologies;
    job_role = req.query.job_role;
    job_description = req.query.job_description;
    status = req.query.status;
    req.session.message = "";
  }
  res.render('./../views/useroperations/addjob',
    {
      loggedin: req.session.isLoggedIn,
      role: "manager",
      title: "Job Portal",
      created_by: req.session.userId,
      userName: req.session.userName,
      message: msg,
      project_name: project_name,
      client_name: client_name,
      technologies: technologies,
      job_role: job_role,
      job_description: job_description,
      status: status
    })
});

var job_closed_handler = function (req) {
  // AppliedJob.findOne(
  //   { job_id: req.body.job_id, user_id: req.session.userId },
  //   function (err, existingJob) {
  //     if (err) {
  //       console.log('Error while getting employee detail: ', err);
  //     }     
  //     if (existingJob) {
  //       console.log("Job closed");
  //     }
  //   }
  //    )
  console.log("Job closed");
}

event_emitter.on('job_closed', job_closed_handler);

module.exports = router;