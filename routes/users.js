const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');
const signUpController = require('../controllers/signUpController');

router.get('/forgot_pw', loginController.forgotPw);
router.get('/participantHome', loginController.parHome);
router.get('/eos_provider_profile', loginController.proProfile);


router.get('/participant_signup', signUpController.participantSignup);
router.get('/provider_signup', signUpController.providerSignup);
router.get('/participantHome', signUpController.participantSignupSubmit);
router.get('/eos_provider_profile', signUpController.providerSignupSubmit);

router.post('/participant_signup', function(req, res){
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;

	console.log(username);
});

module.exports = router;