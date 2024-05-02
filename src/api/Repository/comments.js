const Comment = require('../Models/Comment.model');

// Create a new comment
const createComment = async (commentData) => {
  try {
    const comment = new Comment(commentData);
    await comment.save();
    return comment;
  } catch (error) {
    throw new Error('Failed to create comment');
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
  getCommentsByPostId,
  getCommentsByUserId,
  updateCommentById,
  deleteCommentById,
};
