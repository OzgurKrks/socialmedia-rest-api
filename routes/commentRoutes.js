const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const {
  addComment,
  deleteComment,
} = require("../controller/commentController");

router.post("/addComment/:post_id", protect, addComment);
router.delete("/deleteComment/:comment_id", protect, deleteComment);

module.exports = router;
