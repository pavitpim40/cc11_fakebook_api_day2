exports.getMe = (req, res, next) => {
  res.json({ user: req.user });
};
