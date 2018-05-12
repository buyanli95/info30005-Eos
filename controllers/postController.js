//bring in The Post model
Post = require("../models/post");
Participant = require("../models/participants");
Provider = require("../models/providers");
likedPost = require("../models/likedPost");
joinedPost = require("../models/joinedPost");

//connect db
mongoose = require('mongoose')
mongoose.connect('mongodb://eosdev:info30005@ds259119.mlab.com:59119/eosdb');
let db = mongoose.connection;

module.exports.display = function(req,res){
    let username = req.session.username;
    let postid = req.session.postid;

    joinedPost.findOne({username:username} ,function(err,JoinObj){

        if(err) throw err;

        else if(!JoinObj){
            console.log("post not exist!");
            res.render('post_joined',{event: {}});
        }
        else{
            console.log(JoinObj,"dafafsdafa");
            res.render('post_joined',{event: JoinObj});
            }
    });
}

module.exports.edit = function (req, res) {
    const username = req.session.username;
    console.log("Cusername"+username);
    Participant.findOne({username: username}, function(err, participantObj){
        if(err) throw err;
        else if(!participantObj){
            console.log("participant not exist!");
            res.redirect('/eos_participant_profile')
        }else{

            console.log("participant found: "+participantObj);
            res.render('edit',{participant: participantObj});
        }
    });
}
 module.exports.edit2 = function (req, res) {
    //console.log("checkkkkkkkkkkkkkkkkkkkkkk");
   //const cname = req.session.cname;
     res.render('edit2');}
//     console.log("Cname： "+cname);
//     // Provider.findOne({cname: cname}, function(err, providerObj){
//     //     if(err) throw err;
//     //     else if(!providerObj){
//     //         console.log("provider not exist!");
//     //         res.redirect('/eos_provider_profile')
//     //     }else{
//     //         // res.locals.title = postObj.title;
//     //         // res.locals.brief = postObj.brief;
//     //         // res.locals.detail = postObj.detail;
//     //         console.log("provider found: "+providerObj);
// ,{provider: providerObj});}
//     //     }
//     // });
// }

//fetchPost
module.exports.providerPost = function (req, res) {
    //get cname of the post
    var postid = req.params.id;
    var cname = req.session.cname;

    Post.findOne({_id: req.params.id}, function(err, postObj){
        if(err) throw err;
        else if(!postObj){
            console.log("post not exist!");
            res.redirect('/eos_provider_profile')
        }else if(postObj.cname === req.params.cname){
            console.log(postObj);
            res.render('post2',{post: postObj});
        }
    });
}

//add a new post
module.exports.addPost = function (req, res) {
    //allow postAdd.ejs use the value of cname
    const cname = req.session.cname;
    res.locals.cname = cname;
    // const title = req.session.title;
    // res.locals.title = title;
    res.render('postAdd');
}

module.exports.addPostProcess = function (req, res) {
    //process post messages
    var raw_title = req.body.title;
    var raw_brief = req.body.brief;
    var raw_detail = req.body.detail;

    const title = raw_title.substring(3, raw_title.length-4);
    const brief = raw_brief.substring(3, raw_brief.length-4);
    const detail = raw_detail.substring(3, raw_detail.length-4);
    const date = req.body.date;
    const cname = req.session.cname;

    req.checkBody('title', 'title is required').notEmpty();
    req.checkBody('brief', 'brief is required').notEmpty();
    req.checkBody('detail', 'detail is required').notEmpty();

    let errors = req.validationErrors();
    if(errors){
        res.render('postAdd', {
            errors: errors
        });
    }else{
        let newPost = new Post({
            title: title,
            brief: brief,
            detail: detail,
            date: date,
            cname: cname,
            like: null,
            join: null
        });
        newPost.save(function (err) {
            if(err){
                console.log(err);
                return;
            }else{
                console.log("posted!");
                res.redirect('/eos_provider_profile');
            }
        });
    }
}