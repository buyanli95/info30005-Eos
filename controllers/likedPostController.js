LikedPost = require("../models/likedPost");

module.exports.likedPost = function (req, res) {
    console.log("likepost js file!");

    let username = req.body.username;
    let postid = req.body.postid;
    let date = req.body.date;
    let title = req.body.title;
    let brief = req.body.brief;

    //manage mongodb - untested code!!!!!
    LikedPost.findOne({username, postid, date}, function (err, likedPostObj) {
        if(err){
            console.log("error: " + err);
        }

        else if(!likedPostObj){
            let newLikedPostObj = new LikedPost({
               postid: postid,
               username: username,
               date: date,
               title: title,
                brief: brief
            });

            newLikedPostObj.save(function (err) {
                if(err){
                    console.log(err);
                    return;
                }else{
                    console.log("liked record added!");
                }
            });
        }
        else{
            let query = {username: username, postid: postid, date: date};
            console.log(query);
            LikedPost.deleteOne(query, function (err, obj) {
                if(err) throw err;
                else{
                    console.log("liked record deleted!");
                }
            });
        }
    });
}
