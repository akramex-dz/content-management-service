const Post = require('../Models/Post.model');

// Create a new post
const createPost = async (postData) => {
  try {
    const post = new Post(postData);
    await post.save();
    return post;
  } catch (error) {
    throw new Error('Failed to create post');
  }
};

// Get all posts sorted
const getAllPosts = async () => {
  try {
    // get the posts and populate both comments and likes

    const posts = await Post.find().sort({ createdAt: -1 }).populate('comments', 'likes');
    return posts;
  } catch (error) {
    throw new Error('Failed to get posts');
  }
};

// get posts by userIds array sorted by their date including their comments
const getPostsByUserIds = async (userIds) => {
  try {
    const posts = await Post.find({ userId: { $in: userIds } }).sort({ createdAt: -1 }).populate('comments');
    return posts;
  } catch (error) {
    throw new Error('Failed to get posts');
  }
};

// get all posts by userId sorted by their date
const getPostsByUserId = async (userId) => {
  try {
    const posts = await Post.find({ userId }).sort({ createdAt: -1 });
    return posts;
  } catch (error) {
    throw new Error('Failed to get posts');
  }
};

// Get a single post by ID
const getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (error) {
    throw new Error('Failed to get post');
  }
};

// Update a post by ID
const updatePostById = async (postId, postData) => {
  try {
    const post = await Post.findByIdAndUpdate(postId, postData, { new: true });
    return post;
  } catch (error) {
    throw new Error('Failed to update post');
  }
};

// add a comment to a post by ID
const addCommentToPost = async (postId, commentId) => {
  try {
    const post = await Post
      .findByIdAndUpdate(postId, { $push: { comments: commentId } }, { new: true });
    return post;
  } catch (error) {
    throw new Error('Failed to add comment to post');
  }
};

// add a post to a post by ID
const addLikeToPost = async (postId, likeId) => {
  try {
    const post = await Post
      .findByIdAndUpdate(postId, { $push: { likes: likeId } }, { new: true });
    return post;
  } catch (error) {
    throw new Error('Failed to add like to post');
  }
};

// remove a like from a post by ID
const removeLikeFromPost = async (postId, likeId) => {
  try {
    const post = await Post
      .findByIdAndUpdate(postId, { $pull: { likes: likeId } }, { new: true });
    return post;
  } catch (error) {
    throw new Error('Failed to remove like from post');
  }
};

// Delete a post by ID
const deletePostById = async (postId) => {
  try {
    await Post.findByIdAndDelete(postId);
  } catch (error) {
    throw new Error('Failed to delete post');
  }
};

module.exports = {
  createPost,
  getPostById,
  getPostsByUserId,
  getAllPosts,
  getPostsByUserIds,
  updatePostById,
  addCommentToPost,
  addLikeToPost,
  removeLikeFromPost,
  deletePostById,
};
