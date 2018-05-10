LikedPost = require("../models/likedPost");


function likeAPost(username, postid, date) {
    console.log("likepost js file!");
    alert("postid: "+ username +" " + postid + " "+ date);

    //manage mongodb - untested code!!!!!
    LikedPost.find({username: username}, function (err, likedPostObj) {
        if(err){
            console.log("error: " + err);
        }

        else if(!likedPostObj){
            let newLikedPostObj = new LikedPost({
               postid: postid,
               username: username,
               date: date
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
            let query = {postid: postid, username: username, date: date};
            LikedPost.deleteOne(query, function (err, obj) {
                if(err) throw err;
                else{
                    console.log("liked record deleted!");
                }
            });
        }
    });
}