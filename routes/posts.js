const express = require('express');
const router = express.Router();

const postController = require("../controllers/postController");

router.post('/addPostProcess', postController.addPostProcess);
router.post('/fetchPost', postController.providerPost);

module.exports = router;