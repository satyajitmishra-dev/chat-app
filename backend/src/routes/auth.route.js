import express from "express";
import multer from 'multer'
import { signup, login, logout, updateProfile, checkAuth} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Auth Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, upload.single('avatar'), updateProfile);
router.get("/check", protectRoute, checkAuth)

export default router;
