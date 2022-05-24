const express = require("express");
const upload = require("../middlewares/upload");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/me", userController.getMe);
router.patch("/", upload.single("profilePic"), userController.updateProfile);
module.exports = router;
