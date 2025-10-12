import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
senderID:{
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
},
reciverID:{
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
},
message:{
    type: String,
},
image:{
    type: String
}
}, {timestamps: true})

export const Message = mongoose.model("Message", messageSchema)