const createError = require("../utils/createError");
const { Friend } = require("../models");
exports.requestFriend = async (req, res, next) => {
  try {
    const { requestToId } = req.body;
    if (req.user.id === requestToId) {
      createError("You can't request yourself", 400);
    }
  } catch (error) {
    next(error);
  }
};
