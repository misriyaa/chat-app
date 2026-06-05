import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
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
      
      console.log("Socket CORS Request Origin:", origin);
      console.log("Socket Allowed Origins List:", allowedOrigins);

      if (isLocalhost || isVercel || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
        callback(null, true);
      } else {
        console.error(`Socket Origin ${origin} not found in allowed list`);
        callback(new Error("Not allowed by CORS"));
      }
    },
  },
});

////online users store
const userSocketMap = {};

export function getReceiverSocketId(receiverId) {
  return userSocketMap[receiverId];
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  //emit used to send events to connected all users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
