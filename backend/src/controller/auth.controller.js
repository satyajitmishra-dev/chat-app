import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateToken } from "../utils/generateJWT.js";

export const signup = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Check for empty fields
    if (!fullName || !email || !password) {
      throw new ApiError(400, "All fields are required!");
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
      fullName,
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

    if (!email || !password) {
      throw new ApiError(400, "All filelds are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "Email does not Exist !! Please Signup first..");
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

    throw new ApiError(500, "Error ! While Login ", error);
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

export const updateProfile = asyncHandler(async(req, res) => {
  try {
    
    

  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error! While Updating Profile ", error);
  }
});