const express = require('express');
const router = express.Router();
// const jobController = require('../controllers/jobController');
const indexController = require('../controllers/indexController');
const loginController = require('../controllers/loginController');
const signUpController = require('../controllers/signUpController');

router.get('/', indexController.homePage);

router.get('/forgot_pw', loginController.forgotPw);
router.get('/eos_participant_home', loginController.parHome);

router.get('/participant_signup', signUpController.participantSignup);
router.get('/provider_signup', signUpController.providerSignup);

module.exports = router;

// router.get('/job', jobController.printAllJobs);
// router.get('/job/:id', jobController.printIdJobs);




