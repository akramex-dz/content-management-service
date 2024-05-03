const express = require('express');
const postsRepository = require('../Repository/posts.repository');
const likesRepository = require('../Repository/likes.repository');

const router = express.Router();

// GET /posts
router.get('/', async (req, res) => {
  try {
    const posts = await postsRepository.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /posts/:postId
router.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await postsRepository.getPostById(postId);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json(post);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /posts/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await postsRepository.getPostsByUserId(userId);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /posts/users
router.post('/users', async (req, res) => {
  try {
    const { userIds } = req.body;
    const posts = await postsRepository.getPostsByUserIds(userIds);
    res.json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST /posts
router.post('/', async (req, res) => {
  try {
    const newPost = req.body;
    const createdPost = await postsRepository.createPost(newPost);
    res.status(201).json(createdPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /posts/:postId
router.put('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const updatedPost = req.body;
    const result = await postsRepository.updatePostById(postId, updatedPost);
    if (!result) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json(updatedPost);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /posts/:postId
router.delete('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await postsRepository.getPostById(postId);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      await postsRepository.deletePostById(postId);
      res.json({ message: 'Post deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Like a post by ID
router.post('/:postId/like', async (req, res) => {
  try {
    const post = await postsRepository.getPostById(req.params.postId);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
    }

    const likeExists = await likesRepository
      .getLikeByLikedIdAndUserId(req.params.postId, req.body.userId, 'Post');
    if (likeExists) {
      res.status(400).json({ error: 'You have already liked this post' });
    }

    const like = await likesRepository.createLike({
      userId: req.body.userId,
      onModel: 'Post',
      likedId: req.params.postId,
    });
    const updatedPost = await postsRepository
      .addLikeToPost(req.params.postId, like._id);
    res.status(201).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Unlike a post by ID
router.delete('/:postId/unlike/:userId', async (req, res) => {
  try {
    const likeTodelete = await likesRepository
      .getLikeByLikedIdAndUserId(req.params.postId, req.params.userId, 'Post');

    if (!likeTodelete) {
      res.status(404).json({ error: 'Like not found' });
    }
    await likesRepository.deleteLikeById(likeTodelete._id);
    await postsRepository.removeLikeFromPost(req.params.postId, likeTodelete._id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
