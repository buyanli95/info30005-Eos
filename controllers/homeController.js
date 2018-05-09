//bring in The Post model
Post = require("../models/post");

module.exports.par_profile = function (req, res) {
    const username = req.session.username
    res.locals.username = username;
    res.render('eos_participant_profile');
}

module.exports.toPost = function (req, res) {
    Post.findOne({_id: req.params.id}, function (err, postObj) {
        if(err) throw err;
        if(!postObj){
            console.log("parHome toPost: post does not exist!");
        }else{
            res.render('post', {post: postObj});
        }
    });

}