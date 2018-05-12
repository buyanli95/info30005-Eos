let Provider = require('../models/providers');
const alert  = require('alert-node');
//provider register process
module.exports.providerRegisterProcess = function(req, res){
    // const name = req.body.name;
    const email = req.body.email;
    const cname = req.body.cname;
    const password = req.body.password;
    const password2 = req.body.password2;
    //set validation rules
    if(password2 !== password){
        alert("Password does not match!");
        return;
    }

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