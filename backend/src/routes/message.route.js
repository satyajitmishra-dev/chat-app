import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUserMessages, getUsersForSidebar, sendMessage } from "../controller/message.controller.js";

const router = Router()

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getUserMessages)
router.post("/send/:id", protectRoute, sendMessage)

export default router