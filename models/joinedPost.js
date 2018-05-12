const mongoose = require('mongoose');

//liked post schema
const joinedPostSchema = mongoose.Schema({
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
    }
})

const joinedPost = module.exports = mongoose.model('joinedPost', joinedPostSchema);