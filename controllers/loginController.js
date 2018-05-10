const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const Post = require("../models/post");

mongoose.connect('mongodb://eosdev:info30005@ds259119.mlab.com:59119/eosdb');
let db = mongoose.connection;

module.exports.forgotPw = function (req, res) {
    res.render('forgot_pw');
}

//login to participant Home page
module.exports.parHome = function (req, res) {
    //get username
    const username = req.session.username;
    res.locals.username = username;

    //find posts
    Post.find({}, function(err, posts){
        if(err) throw err;
        else if(!posts){
            console.log("arHome: there's no posts");
        }else{
            res.render('participantHome', {posts: posts});
        }
    });
}

//login to eos_provider_profile
module.exports.proProfile = function (req, res) {
    //get the username of provider(cname) AND keep it const
    const cname = req.session.cname;
    res.locals.cname = cname;
    //find exist posts
    Post.find({}, function(err, posts){
        if(err) throw err;
        else if(!posts){
            console.log("proProfile: post does not found");
        }else{
            res.render('eos_provider_profile', {posts: posts});
        }
    });
}

module.exports.loginProcess = function(req, res){
    var roles = req.body.roles;
    if(roles === "par"){
        var par = db.collection('participants').findOne({username: req.body.username}, function(parErr, parUser){
            if(parErr) throw parErr;
            if(!parUser){
                console.log('participant does not exist');
                // window.alert("User does not exist!");
                req.flash("/", "user does not exist");
                res.redirect('/');
            }else if(req.body.password === parUser.password){
                //allow the participant homepage to access username
                req.session.username = parUser.username;
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