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
    const comment = await Comment.findById(commentId).populate('likes').sort({ createdAt: -1 });

    return comment;
  } catch (error) {
    throw new Error('Failed to get comment');
  }
};

// get all comments by postId sorted by their date
const getCommentsByPostId = async (postId) => {
  try {
    const comments = await Comment.find({ postId }).populate('likes').sort({ createdAt: -1 });
    return comments;
  } catch (error) {
    throw new Error('Failed to get comments');
  }
};

// Get all comments by userId sorted by their date
const getCommentsByUserId = async (userId) => {
  try {
    const comments = await Comment.find({ userId }).populate('likes').sort({ createdAt: -1 });
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
const addLikeToComment = async (commentId, likeId) => {
  try {
    const comment = await Comment
      .findByIdAndUpdate(commentId, { $push: { likes: likeId } }, { new: true });
    return comment;
  } catch (error) {
    throw new Error('Failed to add like to post');
  }
};

// remove a like from a comment by ID
const removeLikeFromComment = async (commentId, likeId) => {
  try {
    const comment = await Comment
      .findByIdAndUpdate(commentId, { $pull: { likes: likeId } }, { new: true });
    return comment;
  } catch (error) {
    throw new Error('Failed to remove like from comment');
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
  removeLikeFromComment,
  deleteCommentById,
};
