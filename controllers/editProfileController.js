Participant = require("../models/participants");
Provider = require("../models/providers");

//participant edit profile form
module.exports.edit = function (req, res) {
    const username = req.session.username;
    Participant.findOne({username: username}, function(err, participantObj){
        if(err) throw err;
        else if(!participantObj){
            console.log("participant not exist!");
            res.redirect('/eos_participant_profile');
        }else{
            res.render('edit',{participant: participantObj});
        }
    });
}

//provider edit profile form
module.exports.edit2 = function (req, res) {
    const cname = req.session.cname;
    Provider.findOne({cname: cname}, function (err, providerobj) {
        if(err) throw err;
        else if(!Provider){
            console.log("provider not exist!");
            res.redirect('eos_provider_profile');
        }else{
            res.render('edit2', {provider: providerobj});
        }
    });
}
module.exports.quiz = function (req, res) {
    //Coming soon page
    //res.render('home_template');
    res.render('quiz');
};

//participant edit profile process
module.exports.participanteditprofile= function(req, res) {
    const email = req.body.email;
    const school = req.body.school;
    const major = req.body.major;
    const grade = req.body.grade;
    const interest = req.body.interest;
    const username = req.session.username;
    res.locals.username = username;

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
