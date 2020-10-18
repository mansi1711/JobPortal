var express = require('express');
var router = express.Router();

const Job = require('../models/job');

/* Add a job opening */
router.post('/new', async function (req, res, next) {
  const job = new Job(req.body);

  job.save((err, savedJob) => {
    if (err) {
      console.log('Error while creating a job: ', err);
    }

    res.json(savedJob);
  });
});

/* Add a job opening */
router.post('/update', async function (req, res, next) {
    var query = { '_id': req.body.job_id };
        var newValues = { $set: { status: req.body.selectpicker } };
        Job.updateOne(query, newValues, function (err, result) {
            if (err) throw err;
            else {
              res.redirect('/');
            }
        });
  });

/* Add job page. */
router.get('/', function(req, res, next) {
  res.render('./../views/useroperations/addjob', 
  {
  loggedin: req.session.isLoggedIn,
  role: "manager",
  title: "Job Portal",
  created_by: req.session.userId
  })
});

module.exports = router;