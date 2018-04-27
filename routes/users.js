const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
// const User = require('../models/users');

const loginController = require('../controllers/loginController');
const signUpController = require('../controllers/signUpController');

router.get('/forgot_pw', loginController.forgotPw);
router.get('/participantHome', loginController.parHome);
router.get('/eos_provider_profile', loginController.proProfile);

router.get('/participant_signup', signUpController.participantSignup);
router.get('/provider_signup', signUpController.providerSignup);
router.get('/participantHome', signUpController.participantSignupSubmit);
router.get('/eos_provider_profile', signUpController.providerSignupSubmit);

//bring in the User Model
let User = require('../models/users');

//jump to Register form
// router.get('/register', function(req, res){
// 	res.render('register');
// })

//register process
router.post('/register', function(req, res){
	const name = req.body.name;
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	const password2 = req.body.password2;
	//set validation rules
	//using express-validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Password do not match').equals(req.body.password);

	console.log('111');

	let errors = req.validationErrors();

	if(errors){
		res.render('participant_signup', {
			errors: errors
		});
		console.log('222');
	}else{
		let newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password
		});
		
		console.log('333');
		newUser.save(function(err){
					if(err){
						console.log(err);
						return;
					}else{
						req.flash('success', 'You are now registered and can log in');
						res.redirect('/users/login');
					}
					console.log('666');
				});
		// bcrypt.genSalt(10, function(err, salt){
		// 	console.log('444');
		// 	bcrypt.hash(newUser.password, salt, function(err, hash){
		// 		if(err){
		// 			console.log(err);
		// 		}
		// 		console.log('555');
		// 		newUser.password = hash;
		// 		newUser.save(function(err){
		// 			if(err){
		// 				console.log(err);
		// 				return;
		// 			}else{
		// 				req.flash('success', 'You are now registered and can log in');
		// 				res.redirect('/users/login');
		// 			}
		// 			console.log('666');
		// 		});
		// 	});
		// });
	}
});

// Login Form
router.get('/login', function(req, res){
  res.render('eos_home');
});

mongoose.connect('mongodb://eosdev:info30005@ds259119.mlab.com:59119/eosdb');
let db = mongoose.connection;

// Login Process
router.post('/login', function(req, res){
	console.log('777');
  // 	passport.authenticate('local', {
  //   failureRedirect:'/users/login',
  //   successRedirect:'/participantHome',
  //   failureFlash: true
  // })(req, res, next);

	var one = db.collection('users').findOne({username: req.body.username}, function(err, user){
 		if(err) throw err;
 		if(!user){
 			console.log('user do not exist');
 			res.redirect('/');
 		}else if(req.body.password === user.password){
 			res.redirect('/participantHome');
 		}
 	})
  console.log('999');
});

module.exports = router;