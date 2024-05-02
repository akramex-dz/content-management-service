const express = require('express');
const commentsRepository = require('../Repository/comments');

const router = express.Router();

// Get all comments by userId
router.get('/user/:userId', async (req, res) => {
  try {
    const comments = await commentsRepository.getCommentsByUserId(req.params.userId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET all comments by postId
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await commentsRepository.getCommentsByPostId(req.params.postId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new comment
router.post('/', async (req, res) => {
  try {
    const newComment = await commentsRepository.createComment(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT (update) an existing comment
router.put('/:commentId', async (req, res) => {
  try {
    const updatedComment = await commentsRepository.updateComment(req.params.commentId, req.body);
    if (!updatedComment) {
      res.status(404).json({ error: 'Comment not found' });
    }
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a comment
router.delete('/:commentId', async (req, res) => {
  try {
    const deletedComment = await commentsRepository.deleteCommentById(req.params.commentId);
    if (!deletedComment) {
      res.status(404).json({ error: 'Comment not found' });
    }
    res.json(deletedComment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
