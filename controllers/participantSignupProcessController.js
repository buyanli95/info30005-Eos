//bring in the User Model
let Participant = require('../models/participants');
//participant register process
module.exports.participantRegisterProcess = function(req, res){
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    //set validation rules
    //using express-validation
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
        // 	bcrypt.hash(newUser.password, salt, function(err, hash){
        // 		if(err){
        // 			console.log(err);
        // 		}
        // 		newUser.password = hash;
        // 		newUser.save(function(err){
        // 			if(err){
        // 				console.log(err);
        // 				return;
        // 			}else{
        // 				req.flash('success', 'You are now registered and can log in');
        // 				res.redirect('/users/login');
        // 			}
        // 		});
        // 	});
        // });
    }
}