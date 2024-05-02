const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        userId: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

// const commentSchema = new mongoose.Schema({
//   postId: { type: String, required: true },
//   userId: { type: String, required: true },
//   userName: { type: String, required: true },
//   content: { type: String, required: true },
//   timestamps: true,
// });

module.exports = mongoose.model('Comment', commentSchema);
