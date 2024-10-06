import { create } from "zustand";
import axios from "axios";
import { AuthState } from "@/types";

const URL = "http://localhost:3000";
axios.defaults.withCredentials = true;
// Define the user data type

// Create the Zustand store
export const AuthStore = create<AuthState>((set) => ({
 user: null,
 isAuthenticated: false,
 error: null,
 isLoading: false,
 isChecking: false,

 signup: async (email: string, name: string, password: string) => {
  set({ isLoading: true, error: null });

  try {
   const res = await axios.post(`${URL}/signup`, { email, password, name });
   set({ user: res.data.user, isAuthenticated: true, isLoading: false });
  } catch (error: any) {
   set({
    error: error.response?.data?.message || "An error occurred",
    isLoading: false,
   });
  }
 },
}));
