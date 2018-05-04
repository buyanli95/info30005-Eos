const mongoose = require('mongoose');
const session = require('session');
const passport = require('passport');
const expressValidator = require('express-validator');

module.exports.forgotPw = function (req, res) {
    res.render('forgot_pw');
}
module.exports.parHome = function (req, res) {
    res.render('participantHome');
}
module.exports.proProfile = function (req, res) {
    //get the username of provider AND keep it const
    const cname = req.session.cname;
    res.locals.cname = cname;
    res.render('eos_provider_profile');
}

mongoose.connect('mongodb://eosdev:info30005@ds259119.mlab.com:59119/eosdb');
let db = mongoose.connection;

module.exports.loginProcess = function(req, res){
    var roles = req.body.roles;
    if(roles === "par"){
        var par = db.collection('participants').findOne({username: req.body.username}, function(parErr, parUser){
            if(parErr) throw parErr;
            if(!parUser){
                console.log('participant does not exist');
                res.redirect('/');
            }else if(req.body.password === parUser.password){
                res.redirect('/participantHome');
            }
        })
    }else if(roles === "pro"){
        var pro = db.collection('providers').findOne({cname: req.body.username}, function(proErr, proUser){
            if(proErr) throw proErr;
            if(!proUser){
                console.log('provider does not exist');
                res.redirect('/');
            }else if(req.body.password === proUser.password){
                // var session = req.session;
                // session.obj = proUser.cname;
                req.session.cname = proUser.cname;
                // console.log("loginprocess: " +session.obj);
                res.redirect('/eos_provider_profile');
            }else{
                console.log(proUser);
            }
        })
    }
}

//Passport
// module.exports.loginProcess = function(req, res){
//     var roles = req.body.roles;
//     if(roles === "par"){
//         console.log('participant login process');
//         passport.authenticate('local', {
//             successRedirect:'/participantHome',
//             failureRedirect:'/login',
//             failureFlash: true
//         })
// 	}
//
//
// }