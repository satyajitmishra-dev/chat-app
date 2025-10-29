import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Message} from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = asyncHandler(async (req, res) => {
   try {
     const loggedInUserId = req.user._id;
     const filterUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
 
     res.status(200).json(new ApiResponse(200, filterUsers, "Sidebar user fetched Successfully"))
   } catch (error) {
    console.log(error);
    throw new ApiError(401, "Error ! While get users for sidebar",error)
    
   }
})

export const getUserMessages = asyncHandler(async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderID: senderId, reciverID: receiverId },
        { senderID: receiverId, reciverID: senderId },
      ],
    }).lean(); // <-- Convert Mongoose docs to plain JS objects

    // Convert ObjectIds to string so frontend comparison works
    const formattedMessages = messages.map((msg) => ({
      ...msg,
      senderID: msg.senderID.toString(),
      reciverID: msg.reciverID.toString(),
    }));

    res
      .status(200)
      .json(new ApiResponse(200, formattedMessages, "Messages fetched successfully"));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Error!! While getUserMessages", error);
  }
});


export const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { image, text } = req.body;
    const receiverId = req.params.id;          
    const senderId = req.user._id;

    let uploadedImageUrl = "";


    if (image) {
      const uploadImage = await cloudinary.uploader.upload(image);
      uploadedImageUrl = uploadImage.secure_url;
    }

    // Create and save new message
    const newMessage = new Message({
      senderID: senderId,
      reciverID: receiverId,
      message: text,
      image: uploadedImageUrl || "",
    });

    await newMessage.save();

    // TODO: Add real-time socket event later
    res
      .status(200)
      .json(new ApiResponse(200, newMessage, "Message sent successfully"));
  } catch (error) {
    console.error("Send message error:", error);
    throw new ApiError(500, "Error while sending message", error);
  }
});
