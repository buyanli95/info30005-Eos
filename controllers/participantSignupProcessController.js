//bring in the User Model
let Participant = require('../models/participants');
const alert  = require('alert-node');
//participant register process
module.exports.participantRegisterProcess = function(req, res){
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    const interest =  req.body.interest;
    //set validation rules
    if(password2 !== password){
        alert("Password does not match!");
        // res.render('participant_signup');
        return;
    }

    let errors = req.validationErrors();
    if(errors){
        res.render('participant_signup', {
            errors: errors
        });
    }else{
        let newParticipant = new Participant({
            email: email,
            username: username,
            password: password,
            Interests: interest
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
    }
}

// module.exports.test = function (req, res) {
//     res.render('forgot_pw');
// }

