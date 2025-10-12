import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Message} from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = asyncHandler(async (req, res) => {
   try {
     const loggedInUserId = req.user._id;
     const filterUsers = await User.find({$ne: loggedInUserId}).select("-password")
 
     res.status(200).json(new ApiResponse(200, filterUsers, "Sidebar user fetched Successfully"))
   } catch (error) {
    console.log(error);
    throw new ApiError(401, "Error ! While get users for sidebar",error)
    
   }
})

export const getUserMessages = asyncHandler(async(req, res) => {
    try {
        const {id: reciverId} = req.params
        const senderId = req.user._id;

        const messages = await Message.find({
            
            $or: [
                {senderID: senderId, reciverID: reciverId},// From me --> my friend
                {senderID: reciverId, reciverID: senderId} //From friend -->  me 
            ]
        })

        res.status(200).json(new ApiResponse(200, messages, "Message Successfully Sent !"))
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Error!! While getUserMessages ", error)
    }
})

export const sendMessage = asyncHandler(async(req, res) =>{
    try {
        const {image, text} = req.boy
        const {id: reciverId} = req.params
        const {id: senderId} = req.body._id
    
        let sendImage;
    
        if(image){
            const uploadImage = await cloudinary.uploader.upload(image)
            sendImage = uploadImage.secure_url
        }
    
        const newMessages = new Message({
            senderID: senderId,
            reciverID: reciverId,
            message:text,
            image: image || ""
            
        })
    
        await newMessages.save()
        // todo: realtime chat 

        res.status(200).json(new ApiResponse(200, newMessages, "Message Send Successfully"));

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Error ! While Send Message", error)
    }


})