const Joi = require("joi");

exports.signupBodyValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    fullName: Joi.string().required(),
    password: Joi.string().min(6).max(25).required(),
  });
  return schema.validate(body, {
    abortEarly: false,
  });
};
