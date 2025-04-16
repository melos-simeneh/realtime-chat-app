const { AppError } = require("../lib/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
exports.protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw next(new AppError("Unauthorized - no token provided", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return new AppError("Unauthorized - Invalid or expired token", 401);
  }
};
