import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,//prevent XSS attacks
    sameSite: "strict",//prevent CSRF attacks
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};
