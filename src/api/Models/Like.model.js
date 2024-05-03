const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  onModel: {
    type: String,
    required: true,
    enum: ['Post', 'Comment'], // The possible collections
  },
  likedId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel', // This tells Mongoose to use the value of `onModel` as the reference
  },
});

LikeSchema.index({ userId: 1, onModel: 1, likedId: 1 }, { unique: true });

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
