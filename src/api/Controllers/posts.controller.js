const express = require('express');
const postsRepository = require('../Repository/posts.repository');

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

// // PUT /posts/:postId/like
// router.put('/:postId/like', async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const { userId } = req.body;

//     const post = await postsRepository.likePostById(postId, userId);
//     res.json(post);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

module.exports = router;
