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
    const cname = req.session.cname
    res.locals.cname = cname;
    console.log(cname);
    //get title of the post
    console.log(req.session.title);

    // db.collection('posts').findOne({title: title}, function (err, postObj) {
    //     if(err) throw err;
    //     else if(!postObj){
    //         console.log("fetchpost: post with this title does not exists");
    //         console.log(title);
    //         res.redirect('/eos_provider_profile');
    //     }else if(postObj.cname === cname){
    //         console.log("postObj found, title and cname matched!");
    //
    //         req.session.brief = postObj.brief;
    //         req.session.detail = postObj.detail;
    //         // req.session.date = postObj.date;
    //         res.redirect('/post2');
    //         console.log("done finding post");
    //     }else{
    //         console.log("something wrong");
    //     }
    // });
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