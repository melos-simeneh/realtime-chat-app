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
  const MAX_IMAGE_SIZE = 100 * 1024;
  const MAX_TEXT_LENGTH = 5000;

  const schema = Joi.object({
    text: Joi.string().max(MAX_TEXT_LENGTH).optional(),

    image: Joi.string()
      .pattern(/^data:image\/(png|jpeg|jpg|gif);base64,[a-zA-Z0-9+/]+={0,2}$/)
      .custom((value, helpers) => {
        const base64Data = value.split(",")[1];
        const buffer = Buffer.from(base64Data, "base64");
        if (buffer.length > MAX_IMAGE_SIZE) {
          return helpers.error("image.tooLarge");
        }
        return value;
      })
      .optional()
      .messages({
        "string.pattern.base":
          "Unsupported image format. Use PNG, JPEG, JPG, or GIF (base64-encoded).",
        "image.tooLarge": `Image exceeds maximum size of ${
          MAX_IMAGE_SIZE / 1024
        }KB`,
      }),
  })
    .or("text", "image") // Ensures at least one is present
    .messages({
      "object.missing": "Either 'text' or 'image' must be provided.",
    });

  return schema.validate(body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });
};
