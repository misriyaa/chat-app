import express from "express";
import { getUserSidebar,getMessages,sendMessage } from "../controller/messageController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/users",protectRoute, getUserSidebar);
router.get("/:id", protectRoute, getMessages)
router.post("/send/:id", protectRoute, sendMessage)
export default router;
