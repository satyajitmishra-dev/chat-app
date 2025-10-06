import express from "express";
import { signup, login, logout, updateProfile} from "../controller/auth.controller.js";

const router = express.Router();

// Auth Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", updateProfile);

export default router;
