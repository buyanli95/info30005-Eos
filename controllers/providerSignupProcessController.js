let Provider = require('../models/providers');
//provider register process
module.exports.providerRegisterProcess = function(req, res){
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
    }
}