const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "postCategory",
      required: true,
    },
  ],
  title: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Use Date.now as the default value function
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
