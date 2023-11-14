const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  likes: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
    },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
