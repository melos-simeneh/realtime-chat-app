const { generateTokenAndSetCookie } = require("../lib/utils");
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { catchAsync, AppError } = require("../lib/errorHandler");

exports.signup = catchAsync(async (req, res) => {
  const { fullName, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new AppError("Email already exists", 400);
  }
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  const newUser = new User({
    email,
    password: hashedPassword,
    fullName,
  });
  await newUser.save();

  const token = generateToken(newUser._id, res);

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
  const isPasswordCorrect = await bcryptjs.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = generateTokenAndSetCookie(user._id, res);

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    token,
    user: { _id: user._id, email: user.email, fullName: user.fullName },
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
    user: {
      _id: updatedUser._id,
      email: updatedUser.email,
      fullName: updatedUser.fullName,
      profilePic: updatedUser.profilePic,
    },
  });
});
