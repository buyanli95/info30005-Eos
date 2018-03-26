// const jobNames = require('../models/db.js');
// module.exports.printUsers = function(req, res){
//     res.send(jobNames);
// }

const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const indexController = require('../controllers/indexController');

router.get('/', indexController.homePage);

router.get('/job', jobController.printAllJobs);

router.get('/job/:id', jobController.printIdJobs);

module.exports = router;
