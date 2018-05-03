const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


const loginController = require('../controllers/loginController');
const signUpController = require('../controllers/signUpController');
const providerSignupProcessController = require('../controllers/providerSignupProcessController');
const participantSignupProcessController = require('../controllers/participantSignupProcessController');

router.get('/forgot_pw', loginController.forgotPw);
router.get('/participantHome', loginController.parHome);
router.get('/eos_provider_profile', loginController.proProfile);

router.get('/participant_signup', signUpController.participantSignup);
router.get('/provider_signup', signUpController.providerSignup);
router.get('/participantHome', signUpController.participantSignupSubmit);
router.get('/eos_provider_profile', signUpController.providerSignupSubmit);

router.post('/participantRegister', participantSignupProcessController.participantRegisterProcess);
router.post('/providerRegister', providerSignupProcessController.providerRegisterProcess);

const postController = require("../controllers/postController");
router.post('/addPostProcess', postController.addPostProcess);

// Login Form
router.get('/login', function(req, res){
  res.render('eos_home');
});

// Login Process
router.post('/login', loginController.loginProcess);

module.exports = router;