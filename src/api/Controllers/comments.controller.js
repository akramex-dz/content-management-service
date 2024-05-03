const express = require('express');
const postsRepository = require('../Repository/posts.repository');
const commentsRepository = require('../Repository/comments.repository');
const likesRepository = require('../Repository/likes.repository');

const router = express.Router();

// Get all comments by userId TESTED
router.get('/user/:userId', async (req, res) => {
  try {
    const comments = await commentsRepository.getCommentsByUserId(req.params.userId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET all comments by postId Tested
router.get('/post/:postId', async (req, res) => {
  try {
    const post = await postsRepository.getPostById(req.params.postId);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
    }
    const comments = await commentsRepository.getCommentsByPostId(req.params.postId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new comment Tested
router.post('/', async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await postsRepository.getPostById(postId);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
    }
    const newComment = await commentsRepository.createComment(req.body);
    const updatedPost = await postsRepository.addCommentToPost(postId, newComment._id);
    res.status(201).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT (update) an existing comment Tested
router.put('/:commentId', async (req, res) => {
  try {
    const updatedComment = await commentsRepository
      .updateCommentById(req.params.commentId, req.body);
    if (!updatedComment) {
      res.status(404).json({ error: 'Comment not found' });
    }
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a comment by ID Tested
router.delete('/:commentId', async (req, res) => {
  try {
    const deletedComment = await commentsRepository.deleteCommentById(req.params.commentId);
    if (!deletedComment) {
      res.status(404).json({ error: 'Comment not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Like a comment by ID
router.post('/:commentId/like', async (req, res) => {
  try {
    const comment = await commentsRepository.getCommentById(req.params.commentId);
    if (!comment) {
      console.log(comment);
      res.status(404).json({ error: 'Comment not found' });
    }

    const likeExists = await likesRepository
      .getLikeByLikedIdAndUserId(req.params.commentId, req.body.userId, 'Comment');
    if (likeExists) {
      res.status(400).json({ error: 'You have already liked this comment' });
    }

    const like = await likesRepository.createLike({
      userId: req.body.userId,
      onModel: 'Comment',
      likedId: req.params.commentId,
    });
    const updatedComment = await commentsRepository
      .addLikeToComment(req.params.commentId, like._id);
    res.status(201).json(updatedComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Unlike a comment by ID
router.delete('/:commentId/unlike/:userId', async (req, res) => {
  try {
    const likeTodelete = await likesRepository
      .getLikeByLikedIdAndUserId(req.params.commentId, req.params.userId, 'Comment');

    if (!likeTodelete) {
      res.status(404).json({ error: 'Like not found' });
    }
    await likesRepository.deleteLikeById(likeTodelete._id);
    await commentsRepository.removeLikeFromComment(req.params.commentId, likeTodelete._id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
