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
        type: Date,
        require: true
    }
})

const LikedPost = module.exports = mongoose.model('LikedPost', LikedPostSchema);