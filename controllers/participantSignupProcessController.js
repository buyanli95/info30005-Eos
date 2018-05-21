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

    if(password!=password2){
        alert("Password not match!");
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
    }
}

// }

module.exports.participanteditprofile= function(req, res) {
    const email = req.body.email;
    const username = req.session.username;

    const school = req.body.school;
    const major = req.body.major;
    const grade = req.body.grade;
    const interest = req.body.interest;
    console.log("Interest: " + interest);

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
}