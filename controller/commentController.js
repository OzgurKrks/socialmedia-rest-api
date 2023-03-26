const Comment = require("../model/Comment");
const Post = require("../model/Posts");
const asyncHandler = require("express-async-handler");
const User = require("../model/User");

// Add Comment
const addComment = asyncHandler(async (req, res) => {
  const { post_id } = req.params;
  const { content } = req.body;
  const post = await Post.findById(post_id);

  const comment = await Comment.create({
    user: req.user,
    content,
    post: post,
    user_pp: req.user.profile_image,
    username: req.user.name,
  });
  post.comment.push(comment);

  await post.save();

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// Delete Your Comment
const deleteComment = asyncHandler(async (req, res) => {
  const { comment_id } = req.params;
  const comment = await Comment.findById(comment_id);

  const post = await Post.findById(comment.post);

  if (comment.username === req.user.name) {
    await Comment.findByIdAndDelete(comment_id);

    let filterPost = post.comment.filter((m) => m._id != comment_id);
    post.comment = filterPost;
    await post.save();

    res.status(200).json({
      success: true,
      message: "Delete operation  successful",
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Delete operation failed",
    });
  }
});

module.exports = {
  addComment,
  deleteComment,
};
