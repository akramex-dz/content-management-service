const Like = require('../Models/Like.model');

// Create a new Like
const createLike = async (likeData) => {
  try {
    const like = new Like(likeData);
    await like.save();
    return like;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create like');
  }
};

// get a like by likedId and userId
const getLikeByLikedIdAndUserId = async (likedId, userId, onModel) => {
  try {
    const like = await Like.findOne({ likedId, userId, onModel });
    return like;
  } catch (error) {
    throw new Error('Failed to get like');
  }
};

// get all like by userId sorted by their date that are of type post
const getPostLikesByUserId = async (userId) => {
  try {
    const likes = await Like.find({ userId, onModel: 'Post' }).sort({ createdAt: -1 });
    return likes;
  } catch (error) {
    throw new Error('Failed to get likes');
  }
};

// get all like by userId sorted by their date that are of type comment
const getCommentLikesByUserId = async (userId) => {
  try {
    const likes = await Like.find({ userId, onModel: 'Comment' }).sort({ createdAt: -1 });
    return likes;
  } catch (error) {
    throw new Error('Failed to get likes');
  }
};

// Delete a like by ID
const deleteLikeById = async (likeId) => {
  try {
    const like = await Like.findByIdAndDelete(likeId);
    return like;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to delete like');
  }
};

// Export the functions
module.exports = {
  createLike,
  getPostLikesByUserId,
  getCommentLikesByUserId,
  getLikeByLikedIdAndUserId,
  deleteLikeById,
};
