import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateToken } from "../utils/generateJWT.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check for empty fields
    if (!name) {
      throw new ApiError(400, "Name is required");
    }
    if (!email) {
      throw new ApiError(400, "Email is required");
    }
    if (!password) {
      throw new ApiError(400, "Password is required");
    }

    // Password length validation
    if (password.length < 6) {
      throw new ApiError(400, "Password must be at least 6 characters long.");
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "Email already exists!");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      fullName: name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    generateToken(newUser._id, res);

    // ✅ Send proper response
    return res
      .status(201)
      .json(new ApiResponse(201, newUser, "User created successfully!"));
  } catch (error) {
    console.error("Signup Error:", error);
    throw new ApiError(500, "Error while signing up!", error);
  }
});

export const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new ApiError(400, "Email is required");
    }
    if (!password) {
      throw new ApiError(400, "Password is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "Email does not exist! Please sign up first.");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect){
      throw new ApiError(400, "Password does not match")
    }

    generateToken(user._id, res)

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Login successful!"));
  } catch (error) {
    console.log(error);

    throw new ApiError(500, "Email and Password does not match!", error);
  }
});

export const logout = asyncHandler(async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });

    res.status(200).json(new ApiResponse(200, null, "Logout Successful!"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error! While Logout ", error);
  }
});

export const updateProfile = asyncHandler(async (req, res) => {
    if (!req.file) throw new ApiError(400, 'No file uploaded');

    // Convert buffer to base64 data URI
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Upload to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(dataURI, {
        folder: 'chat-app/avatars',
        resource_type: 'auto',
    });

    // Update user record
    const user = await User.findByIdAndUpdate(
        req.user._id,
        { avatar: uploadRes.secure_url },
        { new: true }
    );

    res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user,
    });
});

export const checkAuth = (req, res) =>{
  try{
    // return authenticated user placed on req by protectRoute
    res.status(200).json(new ApiResponse(200, req.user, "User Authenticated"))
  } catch (error) {
    console.log("Error In checkAuth controller", error);
    throw new ApiError(500, "checkAuth controller Error", error)
  }
}