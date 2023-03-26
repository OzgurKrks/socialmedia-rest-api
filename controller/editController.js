const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;

// Edit your profile
const editProfile = asyncHandler(async (req, res) => {
  const { image } = req.body;

  const result = await cloudinary.uploader.upload(image, {
    use_filename: true,
    folder: "social",
  });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      profile_image: result.secure_url,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  await user.save();

  return res.status(200).json({
    succes: true,
    user,
  });
});

module.exports = { editProfile };
