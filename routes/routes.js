const express = require('express');
const router = express.Router();
// const jobController = require('../controllers/jobController');
const indexController = require('../controllers/indexController');
const loginController = require('../controllers/loginController');
const signUpController = require('../controllers/signUpController');
const homeController = require('../controllers/homeController');
const postController = require('../controllers/postController');

router.get('/', indexController.homePage);

router.get('/forgot_pw', loginController.forgotPw);
router.get('/participantHome', loginController.parHome);
router.get('/eos_provider_profile', loginController.proProfile);

//register page
router.get('/participant_signup', signUpController.participantSignup);
router.get('/participantHome', signUpController.participantSignupSubmit);
router.get('/provider_signup', signUpController.providerSignup);
router.get('/eos_provider_profile', signUpController.providerSignupSubmit);

router.get('/eos_participant_profile', homeController.par_profile);
router.get('/post', homeController.toPost);

router.get('/post_liked', postController.postLiked);
router.get('/post_joined', postController.postJoined);
router.get('/post2/:cname/:id', postController.providerPost);
router.get('/postAdd', postController.addPost);

module.exports = router;

// router.get('/job', jobController.printAllJobs);
// router.get('/job/:id', jobController.printIdJobs);




