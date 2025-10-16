import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    // debug logs for troubleshooting authentication / cookie issues
    console.log("protectRoute - req.cookies:", req.cookies);
    console.log("protectRoute - token present:", !!token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("protectRoute - decoded JWT:", decoded);
  console.log("protectRoute - decoded.userId:", decoded.userId);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

  // Support tokens signed with either `userId` (new) or `UserId` (old/mistyped)
  const tokenUserId = decoded.userId || decoded.UserId || decoded.UserID || decoded.id;
  console.log("protectRoute - using tokenUserId:", tokenUserId);

  const user = await User.findById(tokenUserId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};