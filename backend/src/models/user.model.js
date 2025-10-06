import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true
        }, 
        fullName:{
            type: String,
            required: true,
            minlength:[2, "Minimum Two"]
        },
        password: {
            type: String,
            required: true,
            minlength:[4, "Mustbe Greater than 4"]
        },
        avatar: {
            type: String,
            default: ""
        }
    }
    , {timestamps: true})


export const User = mongoose.model("User", userSchema);