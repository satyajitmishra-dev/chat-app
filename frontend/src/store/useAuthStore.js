import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === 'development' ? "http://localhost:5000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  isCheckingAuth: true,
  socket: null,

  connectSocket:() =>{
    const {authUser} = get();
    if (!authUser) return; // No user, no connection

    if (get().socket?.connected) return; // Already connected


    const socket = io(BASE_URL, {
      query: {
        userId: authUser?.data?._id
      }
    });
    
    socket.connect();

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
    set({socket: socket});
  },

  disconnectSocket:() =>{
   if(get().socket?.connected){
     get().socket.disconnect();
   }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      
      // Connect to socket after successful auth check
      get().connectSocket();
    } catch (error) {
      console.log("Error In checkAuth : ", error);
      set({ authUser: null });
    } finally {
      set({
        isCheckingAuth: false,
      });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully ! ");
      
      // Connect to socket after successful signup
      get().connectSocket();

    } catch (error) {
      console.log("Error! While signup", error);
      toast.error(error.response?.data?.message || "Account creation failed !");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login Successfully !");
      // Connect to socket after successful login
      get().connectSocket();
    } catch (error) {
    toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
  try {
    await axiosInstance.post("/auth/logout");
    get().disconnectSocket();
    set({ authUser: null });
    toast.success("Logout successful!");
  } catch (error) {
    toast.error("Logout failed!");
    console.log("Error while logout:", error);
  }
},


 updateProfile: async (file) => {
  try {
    set({ isUpdatingProfile: true });

    const formData = new FormData();
    formData.append('avatar', file);

    const res = await axiosInstance.put('/auth/update-profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    });

    set({ authUser: res.data.user });
    toast.success('Profile Updated Successfully!');
  } catch (error) {
    console.error('Profile update failed:', error);
    toast.error(error.response?.data?.message || 'Profile update failed');
  } finally {
    set({ isUpdatingProfile: false });
  }
},

}));
