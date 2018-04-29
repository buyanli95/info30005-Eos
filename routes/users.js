const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');

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
let Participant = require('../models/participants');
//participant register process
router.post('/participantRegister', function(req, res){
	// const name = req.body.name;
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

	let errors = req.validationErrors();

	if(errors){
		res.render('participant_signup', {
			errors: errors
		});
	}else{
		let newParticipant = new Participant({
			email: email,
			username: username,
			password: password
		});
		newParticipant.save(function(err){
					if(err){
						console.log(err);
						return;
					}else{
						req.flash('success', 'You are now registered and can log in');
						res.redirect('/users/login');
					}
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

let Provider = require('../models/providers');
//provider register process
router.post('/providerRegister', function(req, res){
	// const name = req.body.name;
	const email = req.body.email;
	const cname = req.body.cname;
	const password = req.body.password;
	const password2 = req.body.password2;
	//set validation rules
	//using express-validation
	// req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('cname', 'Cname is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Password do not match').equals(req.body.password);

	let errors = req.validationErrors();

	if(errors){
		res.render('provider_signup', {
			errors: errors
		});
		console.log(errors);
	}else{
		let newProvider = new Provider({
			email: email,
			cname: cname,
			password: password
		});
		newProvider.save(function(err){
					if(err){
						console.log(err);
						return;
					}else{
						req.flash('success', 'You are now registered and can log in');
						res.redirect('/users/login');
					}
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
	var roles = req.body.roles;
 	if(roles === "par"){
 		var par = db.collection('participants').findOne({username: req.body.username}, function(parErr, parUser){
		if(parErr) throw parErr;
		if(!parUser){
			console.log('participant does not exist');
 			res.redirect('/');
		}else if(req.body.password === parUser.password){
			res.redirect('/participantHome');
		// }else{
		}
	})
 	}else if(roles === "pro"){
 			var pro = db.collection('providers').findOne({cname: req.body.username}, function(proErr, proUser){
 				console.log(req.body.username);
                console.log(proUser);
 				if(proErr) throw proErr;
 				if(!proUser){
 					console.log('provider does not exist');
 					res.redirect('/');
 				}else if(req.body.password === proUser.password){
 					res.redirect('/eos_provider_profile');
 				}else{
                    console.log(proUser);
				}
 			})
 	}	

});


module.exports = router;