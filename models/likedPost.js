const mongoose = require('mongoose');

//liked post schema
const LikedPostSchema = mongoose.Schema({
    postid:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true
    },
    date:{
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    brief:{
        type: String,
        require: true
    }
})

const LikedPost = module.exports = mongoose.model('likedPost', LikedPostSchema);