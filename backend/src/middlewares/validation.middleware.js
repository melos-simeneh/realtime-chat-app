const {
  signupBodyValidation,
  loginBodyValidation,
  updateProfileBodyValidation,
} = require("../validators/auth.validator.js");
const { handleValidationError, AppError } = require("../lib/errorHandler.js");

exports.validateRequestBody = (req, res, next) => {
  if (!req.body) {
    throw new AppError("Request body is required", 400);
  }
  next();
};

exports.validateSignupBody = (req, res, next) => {
  const { error } = signupBodyValidation(req.body);
  if (error) {
    return next(handleValidationError(error));
  }
  next();
};

exports.validateLoginBody = (req, res, next) => {
  const { error } = loginBodyValidation(req.body);
  if (error) {
    return next(handleValidationError(error));
  }
  next();
};

exports.validateUpdateProfileBody = (req, res, next) => {
  const { error } = updateProfileBodyValidation(req.body);
  if (error) {
    return next(handleValidationError(error));
  }
  next();
};
