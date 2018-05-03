//bring in The Post model
Post = require("../models/post");

module.exports.postLiked = function(req, res){
    res.render('post_liked');
}
module.exports.postJoined = function (req, res) {
    res.render('post_joined');
}
module.exports.providerPost = function (req, res) {
    res.render('post2');
}
module.exports.addPost = function (req, res) {
    res.render('postAdd');
}


module.exports.addPostProcess = function (req, res) {
    //process post messages
    res.redirect('/post2');
}