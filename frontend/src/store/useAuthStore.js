//this file help to create it one place and use it where needed
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_SOCKET_URL;
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSignedIn: false,
  isLoggedIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/protected");
      set({ authUser: response.data });
      get().connectSocket();
    } catch (error) {
      console.error(error.response?.data);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  //////
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success("Account created successfully");
      set({ authUser: res.data, isLoggedIn: true });
      get().connectSocket();
    } catch (error) {
      console.log("Frontend error:", error.response?.data);

      toast.error(error.response?.data?.message || "Failed to create account");
    }
  },

  /////
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null, isLoggedIn: false });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      console.error("Logout error:", error.response?.data);
      toast.error("Failed to log out");
    }
  },

  ////////////
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      toast.success("Logged in successfully");
      set({ authUser: res.data, isLoggedIn: true });
      get().connectSocket();
    } catch (error) {
      console.log("Frontend error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to log in");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  /////
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Update profile error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  //////
  connectSocket: () => {
    console.log("connectSocket called");
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect()
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds)=>{
      set({onlineUsers:userIds})
    })
  },
  disconnectSocket: () => {
    const socket = get().socket;

    if (socket?.connected) {
      socket.disconnect();
    }

    set({ socket: null });
  },
}));
