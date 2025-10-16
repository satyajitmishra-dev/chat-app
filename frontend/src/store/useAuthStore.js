import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";


export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
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
    } catch (error) {
    toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      return toast.success("Logout successful !");
    } catch (error) {
      toast.error("Logout failed !");
      console.log("Error! While logout", error);
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
