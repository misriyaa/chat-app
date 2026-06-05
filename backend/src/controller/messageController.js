import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

//user sidebar
export const getUserSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await userModel
      .find({ _id: { $ne: loggedInUserId } })
      .select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//get messages
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const messages = await messageModel.find({
      $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//send message
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    console.log(req.body,': message')
    const { id: receiverId } = req.params;
    console.log(req.params,"reciverId")
    const senderId = req.user._id;
    console.log(senderId,"senderId")
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new messageModel({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
