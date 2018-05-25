let Provider = require('../models/providers');
const alert = require('alert-node');
//provider register process
module.exports.providerRegisterProcess = function(req, res){
    // const name = req.body.name;
    const email = req.body.email;
    const cname = req.body.cname;
    const password = req.body.password;
    const password2 = req.body.password2;
    const industry = req.body.industry;
    console.log(industry);
    //set validation rules
    //using express-validation
    // req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('cname', 'Cname is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Password do not match').equals(req.body.password);

    let errors = req.validationErrors();

    Provider.findOne({cname: cname}, function (err, pro) {
        if(err) throw err;
        else if(pro){
            alert("Oooops, username already exist!");
            res.render('provider_signup');
        }else{
            if(password!==password2){
                alert("Password does not match!");
            }

            if(errors){
                res.render('provider_signup', {
                    errors: errors
                });
                console.log(errors);
            }else{
                let newProvider = new Provider({
                    email: email,
                    cname: cname,
                    password: password,
                    industry: industry
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
    });
}