import { create } from "zustand";
import axios from "axios";
import { AuthState } from "@/types";

const URL = "http://localhost:5000"; // Ensure this matches your server's port
axios.defaults.withCredentials = true;

// Create the Zustand store
export const AuthStore = create<AuthState>((set) => ({
 user: null,
 isAuthenticated: false,
 error: null,
 isLoading: false,
 isChecking: false,

 signUp: async (email: string, name: string, password: string) => {
  set({ isLoading: true, error: null });

  try {
   const response = await axios.post(`${URL}/auth/signup`, { email, password, name }); // Corrected endpoint
   set({ user: response.data.user, isAuthenticated: true, isLoading: false });
  } catch (error: any) {
   set({
    error: error.response?.data?.message || "An error occurred",
    isLoading: false,
   });
   throw error;
  }
 },
}));
