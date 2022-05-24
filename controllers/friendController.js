const { Op } = require("sequelize");
const createError = require("../utils/createError");
const { Friend } = require("../models");
const { FRIEND_ACCEPTED, FRIEND_PENDING } = require("../config/constants");

exports.requestFriend = async (req, res, next) => {
  try {
    const { requestToId } = req.body;
    if (req.user.id === requestToId) {
      createError("You can't request yourself", 400);
    }

    const existFriend = await Friend.findOne({
      where: {
        [Op.or]: [
          { requestFromId: req.user.id, requestToId: requestToId },
          { requestFromId: requestToId, requestToId: req.user.id },
        ],
      },
    });

    if (existFriend) {
      createError("You are already friend", 400);
    }

    const friend = await Friend.create({
      requestFromId: req.user.id,
      requestToId: requestToId,
      status: FRIEND_PENDING,
    });

    res.status(201).json({ message: "Friend request sent" });
  } catch (error) {
    next(error);
  }
};

exports.updateFriend = async (req, res, next) => {
  try {
    const { requestFromId } = req.params;

    const friend = await Friend.findOne({
      where: {
        requestFromId,
        requestToId: req.user.id,
        status: FRIEND_PENDING,
      },
    });

    if (!friend) {
      createError("Friend not found", 400);
    }

    friend.status = FRIEND_ACCEPTED;
    await friend.save();

    res.json({ message: "Friend request accepted" });
  } catch (error) {
    next(error);
  }
};

exports.deleteFriend = async (req, res, next) => {
  try {
    const { id } = req.params;
    const friend = await Friend.fineOne({ where: { id } });
    if (!friend) {
      createError("Friend not found", 400);
    }
    if (
      friend.requestFromId !== req.user.id &&
      friend.requestToId !== req.user.id
    ) {
      createError("You can't delete this friend", 400);
    }

    await friend.destroy();
  } catch (error) {
    next(error);
  }
};
