const jobNames = require('../models/db');

module.exports.printAllJobs = function (req, res) {
    res.send(jobNames);
};

module.exports.printIdJobs = function(req, res){
    //res.send(jobNames[req.params.id]);
    res.render('job_template', {jobs: jobNames[req.params.id]});
};