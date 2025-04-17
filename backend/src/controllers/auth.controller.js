const { generateTokenAndSetCookie } = require("../lib/utils");
const User = require("../models/user.model");
const { catchAsync, AppError } = require("../lib/errorHandler");
const { hashPassword, verifyPassword } = require("../lib/jwt");

exports.signup = catchAsync(async (req, res) => {
  const { fullName, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new AppError("Email already exists", 400);
  }

  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    email,
    password: hashedPassword,
    fullName,
  });
  await newUser.save();

  const token = generateTokenAndSetCookie(newUser._id, res);

  res.status(201).json({
    success: true,
    message: "Signup success",
    token,
    user: { ...newUser._doc, password: undefined },
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }
  const isPasswordCorrect = await verifyPassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = generateTokenAndSetCookie(user._id, res);

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    token,
    user: { ...user._doc, password: undefined },
  });
});

exports.logout = catchAsync(async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

exports.updateProfile = catchAsync(async (req, res) => {
  const { profilePic } = req.body;
  const userId = req.userId;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { profilePic },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: { ...updatedUser._doc, password: undefined },
  });
});

exports.checkAuth = catchAsync(async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.status(200).json({ success: true, message: "Check success", user });
});
