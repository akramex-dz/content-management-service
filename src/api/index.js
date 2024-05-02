const express = require('express');

const router = express.Router();

const posts = require('./Controllers/posts.controller');
const comments = require('./Controllers/comments.controller');

router.use('/posts', posts);
router.use('/comments', comments);

module.exports = router;
