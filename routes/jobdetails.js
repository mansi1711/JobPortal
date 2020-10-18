const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const AppliedJob = require('../models/appliedjob');

// Get full job details
router.post('/', (req, res, next) => {
  Job.find({_id: req.body.job_id}, function (err, jobDetails) {
    if (err) {
        console.log(err);
    } else {
        // res.render("index", { details: jobDetails })
          res.render('./../views/home', {
            loggedin: req.session.isLoggedIn,
            role: req.body.role,
            title: "Job Portal",
            jobDetails: jobDetails,
            isSingleJob: true
          });
    }
});
});

// Get job details for employee
router.get('/employee', (req, res, next) => {
  Job.find({status: "open"}, 'project_name role technologies', function (err, jobDetails) {
    if (err) {
        console.log(err);
    } else {
          res.render('./../views/home', {
            loggedin: req.session.isLoggedIn,
            role: "employee",
            title: "Job Portal",
            jobDetails: jobDetails,
            isSingleJob: false
          });
    }
});
});

// Get job details for manager
router.get('/manager', (req, res, next) => {
  Job.find({created_by: req.session.userId}, 'project_name role technologies', function (err, jobDetails) {
    if (err) {
        console.log(err);
    } else {
          res.render('./../views/home', {
            loggedin: req.session.isLoggedIn,
            role: "manager",
            title: "Job Portal",
            jobDetails: jobDetails,
            isSingleJob: false
          });
    }
});
});

/* Add a job opening */
router.post('/apply', function (req, res, next) {

  AppliedJob.findOne(
    { job_id: req.body.job_id, user_id: req.session.userId },
    function (err, existingJob) {
      if (err) throw err;
      
      if (!existingJob) {
        const job = new AppliedJob(
          {
            "job_id": req.body.job_id,
            "user_id": req.session.userId
          });

        job.save((err, savedJob) => {
          if (err) {
            console.log('Error while creating a job: ', err);
          }
      
          res.json(savedJob);
        });
      }
      else{
        res.json({"already applied: ": "true"});
      }
  }
     )

});

module.exports = router;
