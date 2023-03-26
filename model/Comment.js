const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  content: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  username: {
    type: String,
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
  user_pp: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
