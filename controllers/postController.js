//bring in The Post model
Post = require("../models/post");

module.exports.postLiked = function(req, res){
    res.render('post_liked', {
        user: req.session.cname
    });
}
module.exports.postJoined = function (req, res) {
    res.render('post_joined');
}
module.exports.providerPost = function (req, res) {
    //get post content
    const cname = req.session.cname;
    const title = req.session.title;
    res.locals.cname = cname;
    res.locals.title = req.session.title;
    res.render('post2');
}
module.exports.addPost = function (req, res) {
    //allow postAdd.ejs use the value of cname
    const cname = req.session.cname;
    const title = req.session.title;
    res.locals.cname = cname;
    res.locals.title = title;
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