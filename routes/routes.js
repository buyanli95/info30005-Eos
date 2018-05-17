const express = require('express');
const router = express.Router();
// const jobController = require('../controllers/jobController');
const indexController = require('../controllers/indexController');
const loginController = require('../controllers/loginController');
const signUpController = require('../controllers/signUpController');
const homeController = require('../controllers/homeController');
const postController = require('../controllers/postController');
const participant_editprocess = require('../controllers/participant_editprocess');
const likedPostController = require('../controllers/likedPostController');
const joinedPostController = require('../controllers/joinedPostController');
const editProfileController = require('../controllers/editProfileController');

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
router.get('/post/:id', homeController.toPost);


router.get('/edit', editProfileController.edit);
router.get('/edit2', editProfileController.edit2);

// router.get('/edit', participant_editprocess.participantedit);
router.get('/post2/:cname/:id', postController.providerPost);
router.get('/postAdd', postController.addPost);

// for join and like route
router.post('/postuser/like', likedPostController.likedPost);
router.post('/postuser/join', joinedPostController.joinedPost);
router.get('/post_joined',postController.display);
router.get('/post_liked', postController.postLiked);

module.exports = router;

// router.get('/job', jobController.printAllJobs);
// router.get('/job/:id', jobController.printIdJobs);




