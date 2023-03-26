const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const { editProfile } = require("../controller/editController");

router.put("/editProfile", protect, editProfile);

module.exports = router;
