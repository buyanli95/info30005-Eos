joinedPost = require("../models/joinedPost");

module.exports.joinedPost = function (req, res) {
  console.log("joinpost js file!");
  console.log("postid: "+ req.body.username +" " + req.body.postid + " "+ req.body.date);

  let username = req.body.username;
  let postid = req.body.postid;
  let date = req.body.date;
  let title = req.body.title;

    //manage mongodb - untested code!!!!!
  joinedPost.findOne({username, postid, date}, function (err, joinedPostObj) {
        if(err){
            console.log("error: " + err);
        }

        else if(!joinedPostObj){
            let newjoinedPostObj = new joinedPost({
               postid: postid,
               username: username,
               date: date,
               title: title
            });

          newjoinedPostObj.save(function (err) {
                if(err){
                    console.log(err);
                    return;
                }else{
                    console.log("joined record added!");
                }
            });
        }
        else{
            let query = {postid: postid, username: username, date: date};
            joinedPost.deleteOne(query, function (err, obj) {
                if(err) throw err;
                else{
                    console.log("joined record deleted!");
                }
            });
        }
    });
}