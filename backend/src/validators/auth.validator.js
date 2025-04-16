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

exports.loginBodyValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(body, {
    abortEarly: false,
  });
};

exports.updateProfileBodyValidation = (body) => {
  const schema = Joi.object({
    profilePic: Joi.string()
      .required()
      .regex(/^data:image\/(png|jpeg|jpg|gif);base64,[a-zA-Z0-9+/]+={0,2}$/)
      .messages({
        "string.pattern.base":
          "Unsupported image format. Accepted formats are PNG, JPEG, JPG, and GIF (base64-encoded).",
      }),
  });
  return schema.validate(body, {
    abortEarly: false,
  });
};

exports.sendMessageBodyValidation = (body) => {
  const schema = Joi.object({
    text: Joi.string().required(),
    image: Joi.string()
      .optional()
      .regex(/^data:image\/(png|jpeg|jpg|gif);base64,[a-zA-Z0-9+/]+={0,2}$/)
      .messages({
        "string.pattern.base":
          "Unsupported image format. Accepted formats are PNG, JPEG, JPG, and GIF (base64-encoded).",
      }),
  });
  return schema.validate(body, {
    abortEarly: false,
  });
};
