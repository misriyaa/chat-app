import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { email, password, fullName } = req.body;
  console.log("Received signup data:", { email, fullName,password });
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      email,
      password: hashedPassword,
      fullName,
    });
    if (newUser) {
      //generate token
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
  console.error("SIGNUP ERROR:");
  console.error(error);

  res.status(500).json({
    message: error.message,
  });
}
};

//login
export const login =async (req, res) => {
  const { email, password } = req.body;
  try{
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      //generate token
      generateToken(user._id, res);
      res.json({
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        profilePic: user.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  }catch(error){
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

//logout
export const logout = async (req, res) => {
  try{

    res.clearCookie("token", { maxAge: 0 });
    res.json({ message: "Logged out successfully" });
  }catch(error){
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};


//update profile
export const updateProfile = async (req, res) => {
  try{
    const {profilePic} = req.body;
    const userId = req.user._id;
    if(!profilePic){
      return res.status(400).json({message:"Profile picture is required"});
    }
    await cloudinary.uploader.upload(profilePic);
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { profilePic},
      { new: true }
    ).select("-password");
    res.json(updatedUser);

  }catch(error){
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
}

//authnication check
export const checkAuth = async (req, res) => {
  try{
    res.status(200).json(req.user);
  }catch(error){
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
}