const router = require("express").Router();
const {
  getAllUsers,
  getMe,
  followUser,
  unFollowUSer,
  getAUser,
  resetNotifications,
} = require("../controller/usersController");
const { protect } = require("../middleware/authMiddleware");

router.get("/getAllUsers", getAllUsers);
router.get("/getMe", protect, getMe);
router.get("/getAUser/:user_id", getAUser);
router.put("/follow/:id", protect, followUser);
router.put("/unfollow/:id", protect, unFollowUSer);
router.get("/reset-notification", protect, resetNotifications);

module.exports = router;
