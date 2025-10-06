import ApiError from '../utils/ApiError.js'
import mongoose from 'mongoose';

const DB_NAME = "chat-app-v1"
export const connectDB = async() =>{
    try {
        await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`)
        console.log("Database Connection Successfully !!");
        
    } catch (error) {
        throw new ApiError(500, "Database Connection failed !!", error)
    }
}