const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Job = require('../models/job');
const AppliedJob = require('../models/appliedjob');
var events = require('events');

var event_emitter = new events.EventEmitter();

// Get full job details
router.post('/', (req, res, next) => {
  Job.find({ _id: req.body.job_id }, function (err, jobDetails) {
    if (err) {
      console.log('Error while getting job detail: ', err);
      req.session.message = "Error while getting job detail";
      res.redirect('/error');
    } else {
      // res.render("index", { details: jobDetails })
      res.render('./../views/home', {
        loggedin: req.session.isLoggedIn,
        role: req.body.role,
        title: "Job Portal",
        jobDetails: jobDetails,
        isSingleJob: true,
        userName: req.session.userName,
        isError: false
      });
    }
  });
});

// Get job details for employee
router.get('/employee', auth.isAuthenticatedEmployee, (req, res, next) => {
  Job.find({ status: "open" }, 'project_name role technologies', function (err, jobDetails) {
    if (err) {
      console.log('Error while getting jobs: ', err);
      req.session.message = "Error while getting jobs";
      res.redirect('/error');
    } else if (jobDetails.length == 0) {
      console.log('There are no open jobs available:', err);
      req.session.message = "There are no open jobs available";
      res.redirect('/error');
    } else {
      res.render('./../views/home', {
        loggedin: req.session.isLoggedIn,
        role: req.session.role,
        title: "Job Portal",
        jobDetails: jobDetails,
        isSingleJob: false,
        userName: req.session.userName,
        isError: false
      });
    }
  });
});

// Get job details for manager
router.get('/manager', auth.isAuthenticatedManager, (req, res, next) => {
  Job.find({ created_by: req.session.userId }, 'project_name role technologies', function (err, jobDetails) {
    if (err) {
      console.log('Error while getting jobs: ', err);
      req.session.message = "Error while getting jobs";
      res.redirect('/error');
    } else if (jobDetails.length == 0) {
      console.log('You have not added any jobs yet:', err);
      req.session.message = "You have not added any jobs yet: Add Job to see details here";
      res.redirect('/error');
    } else {
      res.render('./../views/home', {
        loggedin: req.session.isLoggedIn,
        role: req.session.role,
        title: "Job Portal",
        jobDetails: jobDetails,
        isSingleJob: false,
        userName: req.session.userName,
        isError: false
      });
    }
  });
});

/* Apply for a job opening */
router.post('/apply', auth.isAuthenticatedEmployee, function (req, res, next) {

  AppliedJob.findOne(
    { job_id: req.body.job_id, user_id: req.session.userId },
    function (err, existingJob) {
      if (err) {
        console.log('Error while applying: ', err);
        req.session.message = "Error while applying";
        res.redirect('/error');
      }

      if (!existingJob) {
        const job = new AppliedJob(
          {
            "job_id": req.body.job_id,
            "user_id": req.session.userId
          });

        job.save((err, savedJob) => {
          if (err) {
            console.log('Error while applying for the job: ', err);
            req.session.message = "Error while applying for the job";
            res.redirect('/error');
          }
          res.redirect('/');
        });
      }
      else {
        event_emitter.emit('job_applied', req);
        req.session.message = "Already Applied !!";
        res.redirect('/error');
      }
    }
  )

});

var job_applied_handler = function (req) {
  // Job.findOne(
  //   { _id: req.body.job_id, created_by: req.session.userId },
  //   function (err, existingJob) {
  //     if (err) {
  //       console.log('Error while getting job: ', err);
  //     }

  //     if (existingJob) {
  //       console.log("An employee applied for your job");
  //     }
  // }
  //    )
  console.log("An employee applied for your job");
}

event_emitter.on('job_applied', job_applied_handler);


module.exports = router;
