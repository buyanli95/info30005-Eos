const mongoose = require('mongoose');

//post Schema
const PostSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    brief:{
        type: String,
        required:true
    },
    detail:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    cname:{
        type: String,
        required: true
    },
    like:{
        type: Boolean
    },
    join:{
        type: Boolean
    }
    //edit
})

//post this schema as a model
const Post = module.exports = mongoose.model('Post', PostSchema);