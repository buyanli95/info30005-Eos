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

function fermitTime(str){
    let time = str.substring(0,3) + ' ' + str.substring(3,6) + ' ' + str.substring(6,8) + ' ' + str.substring(8, 12) + ' ' + str.substring(12, 20) + ' ' + str.substring(20, 27) + ' ' + str.substring(27, 33)
    let now = new Date(time);
    let year = now.getFullYear();
    let mon = now.getMonth()+1;
    let date= now.getDate();
    if(mon<10){
        mon = '0'+mon;
    };
    if(date<10){
        date = '0'+date;
    }
    let postDate = year+'-'+mon+'-'+date;
    return postDate;
}

module.exports.display = function(req,res){
    let username = req.session.username;
    let postid = req.session.postid;
    let event = [];

    joinedPost.find({username:username} ,function(err,JoinObj){

        if(err) throw err;

        else if(!JoinObj){
            console.log("post not exist!");
            res.render('post_joined',{event: {}});
        }
        else{
            console.log(JoinObj,"that is JoinObj");
            for (let val of JoinObj) {
                event.push({ title: val.title, start: fermitTime(val.date), url: `/post/${val.postid}` })
            }
            console.log(event, "that is event");
            res.render('post_joined',{event: `${JSON.stringify(event).replace('/"/g', '')}`});
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
     res.render('edit2');}

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
module.exports.postLiked =function (req,res){
    const username = req.session.username;
    res.locals.username = username;
    //find posts
    likedPost.find({username:username}, function(err, posts){
        if(err) throw err;
        else if(!posts){
            console.log("postLiked: there's no posts");
        }else{
            console.log(posts.length);
            res.render('post_liked', {posts: posts});
        }
    });
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