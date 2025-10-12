import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";


export const protectRoute = asyncHandler(async (req, res, next) =>{

try {
    const token = req.cookies.jwt
    if (!token) {
        throw new ApiError(400, "Unauthorized Access - No token Provided")
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
        throw new ApiError(400, "Unauthorized Access -Invalid token")
    }
console.log(decodedToken);

    const user = await User.findById(decodedToken.UserId).select("-password");


    if (!user) {
        throw new ApiError(400, "Unauthorized Access - User not found")
    }

    req.user = user

    next()

} catch (error) {
    console.log(error);
    throw new ApiError(400, "Unauthorized Access !!", error)
}

})