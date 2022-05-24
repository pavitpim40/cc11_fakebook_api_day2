const express = require("express");

const friendController = require("../controllers/friendController");
const router = express.Router();

router.get("/me", friendController.requestFriend);
module.exports = router;
