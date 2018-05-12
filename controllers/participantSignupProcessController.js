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

//participant edit profile
module.exports.participanteditprofile= function(req, res) {
    const email = req.body.email;
    const school = req.body.school;
    const major = req.body.major;
    const grade = req.body.grade;
    const interest = req.body.interest;

    console.log("Interest: " + interest);

    const username = req.session.username;
    res.locals.username = username;

    //edit email address
    Participant.findOneAndUpdate({username: username}, {email: email}, function (err, doc) {
        if(err) throw err;
        else if(!doc){
            console.log("participant edit profile: doc is not exist");
        }else{
            console.log("email Edit successful!");
        }
    });
    //edit school info
    Participant.findOneAndUpdate({username: username}, {school: school}, function (err, doc) {
        if(err) throw err;
        else if(!doc){
            console.log("participant edit profile: doc is not exist");
        }else{
            console.log("school Edit successful!");
        }
    });
    //edit major info
    Participant.findOneAndUpdate({username: username}, {major: major}, function (err, doc) {
        if(err) throw err;
        else if(!doc){
            console.log("participant edit profile: doc is not exist");
        }else{
            console.log("major Edit successful!");
        }
    });
    //edit grade info
    Participant.findOneAndUpdate({username: username}, {grade: grade}, function (err, doc) {
        if(err) throw err;
        else if(!doc){
            console.log("participant edit profile: doc is not exist");
        }else{
            console.log("grade Edit successful!");
        }
    });
    //edit interest info
    Participant.findOneAndUpdate({username: username}, {Interest: interest}, function (err, doc) {
        if(err) throw err;
        else if(!doc){
            console.log("participant edit profile: doc is not exist");
        }else{
            console.log("interest Edit successful!");
        }
    });
    res.render('eos_participant_profile');
}