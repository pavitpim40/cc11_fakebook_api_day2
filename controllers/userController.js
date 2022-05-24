const { User } = require("../models");
exports.getMe = (req, res, next) => {
  res.json({ user: req.user });
};

exports.updateProfile = async (req, res, next) => {
  try {
    console.log(req.file);
    await User.update(
      { profilePic: req.file.path },
      { where: { id: req.user.id } }
    );
    res
      .status(200)
      .json({ message: "Profile updated", profilePic: req.file.path });
  } catch (error) {
    next(error);
  }
};
