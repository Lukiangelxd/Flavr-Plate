const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  instructions: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
  comments: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
  ],
  likes: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
  ],
  categories: [
    {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
    },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    }
});

const Recipe = mongoose.model('Product', recipeSchema);

module.exports = Recipe;
