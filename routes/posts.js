const express = require('express');
const router = express.Router();

const postController = require("../controllers/postController");

router.post('/addPostProcess', postController.addPostProcess);
router.post('/fetchPost', postController.providerPost);
router.post('/:cname/:title', function (req, res) {
    if(err){
        console.log("fetch post went wrong");
        return res.redirect('/eos_provider_profile');
    }
    res.render('post2', {post: post});
})

module.exports = router;