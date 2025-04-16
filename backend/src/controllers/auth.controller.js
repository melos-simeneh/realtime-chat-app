const { generateToken } = require("../lib/utils");
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { signupBodyValidation } = require("../validators/auth.validator");
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

  generateToken(newUser._id, res);

  res.status(201).json({
    message: "Signup success",
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
  generateTokenAndSetCookie(user._id, res);
});

exports.logout = async (req, res) => {};
