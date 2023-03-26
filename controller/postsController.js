const Post = require("../model/Posts");
const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;

// Create a Post
const createPost = asyncHandler(async (req, res) => {
  const { title, username, image } = req.body;
  const user = await User.findById(req.user._id);

  const result = await cloudinary.uploader.upload(image, {
    use_filename: true,
    folder: "social",
  });

  const post = await Post.create({
    title,
    url: result.secure_url,
    user: req.user._id,
    username,
    user_profile_image: user.profile_image,
  });

  res.status(200).json(post);
});

// Get All Posts
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();

  res.status(200).json(posts);
});

// Get Own Posts
const getOwnPosts = asyncHandler(async (req, res) => {
  const ownPosts = await Post.find({ user: req.user._id });
  res.status(200).json(ownPosts);
});

// Get A Single Post
const getSinglePost = asyncHandler(async (req, res) => {
  const { post_id } = req.params;
  const post = await Post.findById(post_id);
  res.status(200).json(post);
});
// Get A User's Own Posts
const userOwnPosts = asyncHandler(async (req, res) => {
  const { user_id } = req.params;
  const posts = await Post.find({ user: user_id });

  res.status(200).json(posts);
});
// Get Only Followed Users Posts
const getFollowedPosts = asyncHandler(async (req, res) => {
  const ownPosts = await Post.find({ user: req.user._id });
  const posts = await Post.find({ user: req.user.followed });
  const allPosts = await ownPosts.concat(posts);
  res
    .status(200)
    .json(allPosts.sort((a, b) => a.createdAt - b.createdAt).reverse());
});

// Like A Post
const likePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  const user = await User.findById(post.user);

  // Check Like
  const checkUser = post.likes.includes(req.user._id);
  if (checkUser) {
    return res.status(500).json({
      success: false,
      message: "Like operation failed",
    });
  }
  post.likes.push(req.user._id);
  await post.save();

  if (user) {
    user.notification.push({
      name: "post",
      data: post,
      from_image: req.user.profile_image,
      from: req.user.name,
    });
    await user.save();
  }

  res.status(200).json({
    success: true,
    message: "Like operation successful",
  });
});

// Undo Like A Post
const undoLikePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  const checkUser = post.likes.includes(req.user._id);

  if (checkUser) {
    const index = post.likes.indexOf(req.user._id);

    post.likes.splice(index, 1);
    await post.save();

    return res.status(200).json("success");
  }
  res.status(500).json("false");
});

// Delete Own Posts
const deleteOwnPosts = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const posts = await Post.findById(id);

  const user = await User.findById(posts.user);

  if (req.user.name === user.name) {
    await Post.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Delete operation successful",
    });
  } else {
    res.status(500).json({
      success: false,
      message: "You don't own this post",
    });
  }
});

module.exports = {
  createPost,
  getAllPosts,
  getOwnPosts,
  deleteOwnPosts,
  getFollowedPosts,
  likePost,
  undoLikePost,
  getSinglePost,
  userOwnPosts,
};
