const express = require('express');
const router = express.Router();

const postController = require("../controllers/postController");

router.post('/addPostProcess', postController.addPostProcess);

module.exports = router;