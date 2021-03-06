//bring in The Post model
Post = require("../models/post");
joinedPost = require("../models/joinedPost");
likedPost = require("../models/likedPost");

module.exports.par_profile = function (req, res) {
    const username = req.session.username;
    res.locals.username = username;
    res.render('eos_participant_profile');
}

module.exports.toPost = function (req, res) {
    let join = 0,
        like = 0;
  joinedPost.findOne({username: req.session.username, postid: req.params.id}, function (err, joinedPostObj) {
    if(err){
      console.log("error: " + err);
    }
    if (joinedPostObj) {
      join = 1;
    }
  });

  likedPost.findOne({username: req.session.username, postid: req.params.id}, function (err, likedPostObj) {
    if(err){
      console.log("error: " + err);
    }

    if(likedPostObj){
      like = 1;
    }
  });

    Post.findOne({_id: req.params.id}, function (err, postObj) {
        if(err) throw err;
        if(!postObj){
            console.log("parHome toPost: post does not exist!");
        }else{
            res.render('post', {post: postObj, username: req.session.username, join, like});
        }
    });
}

module.exports.likedToPost = function (req, res) {
    likedPost.findOne({_id: req.params.id}, function (err, postObj) {
        if(err) throw err;
        if(!postObj){
            console.log("likedToPost: liked post does not exist!");
        }else{
            req.session.likedID = postObj.postid;
            //console.log(req.session.likedID);
            Post.findOne({_id: req.session.likedID}, function (err, postObj) {
                if(err) throw err;
                if(!postObj){
                    console.log("likedtoPost: post does not exist!");
                }else{

                    let like = postObj.like = 1;

                    joinedPost.findOne({postid: req.session.likedID}, function (err, joinedPostObj) {
                        if(err){
                            console.log(" joinedPost in likedToPost error: " + err);
                        }
                        if (joinedPostObj) {
                            postObj.join = 1;
                            console.log(postObj.join);
                            console.log(postObj.like);
                        }
                    });

                    res.render('post', {post: postObj, username: req.session.username, join: postObj.join, like});
                }
            });
        }
    });



}