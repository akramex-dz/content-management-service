const Comment = require('../Models/Comment.model');

// Create a new comment and add it to a post using a postId
const createComment = async (commentBody) => {
  try {
    const comment = new Comment(commentBody);
    await comment.save();
    return comment;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create comment');
  }
};

// Get comment by id
const getCommentById = async (commentId) => {
  try {
    const comment = await Comment.find({ commentId });
    return comment;
  } catch (error) {
    throw new Error('Failed to get comment');
  }
};

// get all comments by postId sorted by their date
const getCommentsByPostId = async (postId) => {
  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    return comments;
  } catch (error) {
    throw new Error('Failed to get comments');
  }
};

// Get all comments by userId sorted by their date
const getCommentsByUserId = async (userId) => {
  try {
    const comments = await Comment.find({ userId }).sort({ createdAt: -1 });
    return comments;
  } catch (error) {
    throw new Error('Failed to get comments');
  }
};

// Update a comment by ID
const updateCommentById = async (commentId, updatedData) => {
  try {
    const comment = await Comment.findByIdAndUpdate(commentId, updatedData, { new: true });
    return comment;
  } catch (error) {
    throw new Error('Failed to update comment');
  }
};

// add a comment to a post by ID
const addLikeToComment = async (postId, likeId) => {
  try {
    const comment = await Comment
      .findByIdAndUpdate(postId, { $push: { likes: likeId } }, { new: true });
    return comment;
  } catch (error) {
    throw new Error('Failed to add comment to post');
  }
};

// Delete a comment by ID
const deleteCommentById = async (commentId) => {
  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    return comment;
  } catch (error) {
    throw new Error('Failed to delete comment');
  }
};

// Export the functions
module.exports = {
  createComment,
  getCommentById,
  getCommentsByPostId,
  getCommentsByUserId,
  updateCommentById,
  addLikeToComment,
  deleteCommentById,
};
