import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
  checkAuth
} from "../controller/authContoller.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();
//signup
router.post("/signup", signup);
//login
router.post("/login", login);
//logout
router.post("/logout", logout);

//update profile
router.put("/update-profile", protectRoute, updateProfile);
router.get("/protected", protectRoute, checkAuth)

export default router;
