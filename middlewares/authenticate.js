const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");
const { User } = require("../models");
module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError("authorization is required1", 400);
    }
    const [, token] = authorization.split(" ");
    if (!token) {
      createError("authorization is required2", 400);
    }
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    const payload = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({
      where: { id: payload.id },
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) {
      createError("invalid credential", 400);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
