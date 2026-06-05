import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }

    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
