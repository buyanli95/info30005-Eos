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
    }
}

// module.exports.test = function (req, res) {
//     res.render('forgot_pw');
// }

module.exports.participanteditprofile= function(req, res) {
    const email = req.body.email;
    const username = req.body.username;
    // const school = req.body.school;
    // const major = req.body.major;
    // const grade = req.body.grade;
    // const interest = req.body.interest;
    console.log("Cusername&email: " + username +" "+ email);
    const config = require('./config/database');
    mongoose.connect(config.database);
    let db = mongoose.connection;


    // Participant.findOne({username: username}, function (err, participantObj) {
    //     if(err) throw err;
    //     else if(!participantObj){
    //         console.log("sumit profile edit: participant object does not exist!")
    //     }else{
    //         participantObj.email=email;
    //         participantObj.school=school;
    //         participantObj.major=major;
    //         participantObj.grade=grade;
    //         participantObj.interest=interest;
    //         res.locals.username = username;
    //         res.render('eos_participant_profile');
    //     }
    //  });
}