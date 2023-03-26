const router = require("express").Router();
const {
  createPost,
  getAllPosts,
  getOwnPosts,
  deleteOwnPosts,
  getFollowedPosts,
  likePost,
  undoLikePost,
  getSinglePost,
  userOwnPosts,
} = require("../controller/postsController");
const { protect } = require("../middleware/authMiddleware");

router.post("/createPost", protect, createPost);
router.get("/getAllPosts", getAllPosts);
router.get("/getOwnPosts", protect, getOwnPosts);
router.get("/getSinglePost/:post_id", getSinglePost);
router.get("/getUserOwnPost/:user_id", userOwnPosts);
router.get("/getFollowedPosts", protect, getFollowedPosts);
router.delete("/deleteOwnPosts/:id", protect, deleteOwnPosts);
router.post("/likePost/:id", protect, likePost);
router.post("/undoLikePost/:id", protect, undoLikePost);

module.exports = router;
