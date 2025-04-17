const { catchAsync } = require("../lib/errorHandler");
const Message = require("../models/message.model");
const User = require("../models/user.model");
const { io, getReceiverSocketId } = require("../lib/socket");

exports.getUsersForSidebar = catchAsync(async (req, res) => {
  const logged_in_user_id = req.userId;

  const filtered_users = await User.find({
    _id: { $ne: logged_in_user_id },
  }).select("-password");

  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    users: filtered_users,
  });
});

exports.getMessages = catchAsync(async (req, res) => {
  const my_id = req.userId;
  const { id: userToChatId } = req.params;

  const messages = await Message.find({
    $or: [
      { senderId: my_id, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: my_id },
    ],
  });

  res.status(200).json({
    success: true,
    message: "Messages fetched successfully",
    userMessages: messages,
  });
});

exports.sendMessage = catchAsync(async (req, res) => {
  const sender_id = req.userId;
  const { text, image } = req.body;
  const { id: receiver_id } = req.params;

  const newMessage = new Message({
    senderId: sender_id,
    receiverId: receiver_id,
    text,
    image,
  });

  await newMessage.save();

  const receiverSocketId = getReceiverSocketId(receiver_id);
  if (receiverSocketId) {
    io.to(receiver_id).emit("newMessage", newMessage);
  }

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    sentMessage: newMessage,
  });
});
