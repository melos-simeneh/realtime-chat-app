const mongoose = require("mongoose");
const { AppError } = require("../lib/errorHandler");
const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

messageSchema.pre("validate", function (next) {
  if (!this.text && !this.image) {
    return next(
      new AppError("Either 'text' or 'image' must be provided.", 400)
    );
  }
  next();
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
