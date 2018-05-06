//bring in The Post model
Post = require("../models/post");
//connect db
mongoose = require('mongoose')
mongoose.connect('mongodb://eosdev:info30005@ds259119.mlab.com:59119/eosdb');
let db = mongoose.connection;

module.exports.postLiked = function(req, res){
    res.render('post_liked', {
        user: req.session.cname
    });
}
module.exports.postJoined = function (req, res) {
    res.render('post_joined');
}


//fetchPost
module.exports.providerPost = function (req, res) {
    //get cname of the post

    // var cname = req.params.cname;
    // res.locals.cname = cname;
    // //get title of the post
    // var title = req.params.title;
    // res.locals.title = title;

    var postid = req.params.id;
    var cname = req.session.cname;

    Post.findOne({_id: req.params.id}, function(err, postObj){
        if(err) throw err;
        else if(!postObj){
            console.log("post not exist!");
            res.redirect('/eos_provider_profile')
        }else if(postObj.cname === req.params.cname){
            // res.locals.title = postObj.title;
            // res.locals.brief = postObj.brief;
            // res.locals.detail = postObj.detail;
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
    const title = req.body.title;
    const brief = req.body.brief;
    const detail = req.body.detail;
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