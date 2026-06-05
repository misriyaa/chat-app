import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoute.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

connectDB();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        ...(process.env.FRONTEND_URL 
          ? process.env.FRONTEND_URL.split(",").map(url => url.trim().replace(/\/$/, "")) 
          : [])
      ];
      const isLocalhost = /^http:\/\/localhost(:\d+)?$/.test(origin);
      const isVercel = /\.vercel\.app$/.test(origin);
      
      console.log("CORS Request Origin:", origin);
      console.log("Allowed Origins List:", allowedOrigins);

      if (isLocalhost || isVercel || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
        callback(null, true);
      } else {
        console.error(`Origin ${origin} not found in allowed list`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});