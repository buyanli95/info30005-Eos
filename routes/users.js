const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


const loginController = require('../controllers/loginController');
const signUpController = require('../controllers/signUpController');
const providerSignupController = require('../controllers/providerSignupController');
const participantSignupController = require('../controllers/participantSignupProcess');

router.get('/forgot_pw', loginController.forgotPw);
router.get('/participantHome', loginController.parHome);
router.get('/eos_provider_profile', loginController.proProfile);

router.get('/participant_signup', signUpController.participantSignup);
router.get('/provider_signup', signUpController.providerSignup);
router.get('/participantHome', signUpController.participantSignupSubmit);
router.get('/eos_provider_profile', signUpController.providerSignupSubmit);

router.post('/participantRegister', participantSignupController.participantRegisterProcess);
router.post('/providerRegister', providerSignupController.providerRegisterProcess);

// Login Form
router.get('/login', function(req, res){
  res.render('eos_home');
});

// Login Process
router.post('/login', loginController.loginProcess);

module.exports = router;