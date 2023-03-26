const User = require("../model/User");
const asyncHandler = require("express-async-handler");

// Get All Users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});
// Get Me
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json(user);
});
// Get A User
const getAUser = asyncHandler(async (req, res) => {
  const { user_id } = req.params;
  const user = await User.findById(user_id);

  res.status(200).json(user);
});
// Follow A User
const followUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const me = await User.findById(req.user._id);

  const user = await User.findById(id);

  const checkFollowed = me.followed.includes(id);

  if (user && !checkFollowed) {
    me.followed.push(id);
    user.followers.push(req.user._id);
    user.notification.push({
      name: "follow",
      from: me.name,
      from_image: me.profile_image,
    });
    await me.save();
    await user.save();
    res.status(200).json(user);
  } else {
    res.status(200).json({
      success: false,
      message: "User not found or You already follow this user",
    });
  }
});

// Unfollow A User
const unFollowUSer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const me = await User.findById(req.user._id);
  const followedUser = await User.findById(id);

  const checkFollowed = me.followed.includes(id);
  if (checkFollowed) {
    const index = me.followed.indexOf(id);
    me.followed.splice(index, 1);
    await me.save();
    const index1 = followedUser.followers.indexOf(req.user._id);
    followedUser.followers.splice(index1, 1);
    await followedUser.save();
    res.status(200).json({
      success: true,
      message: "Delete operation is success",
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Delete operation is fail",
    });
  }
});

// Reset Notifications
const resetNotifications = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.notification = [];
    await user.save();

    res.status(200).json({
      message: "Reset notification operation is success",
      data: user,
    });
  }
});

module.exports = {
  getAllUsers,
  getMe,
  followUser,
  unFollowUSer,
  getAUser,
  resetNotifications,
};
