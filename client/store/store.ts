import { create } from "zustand";
import axios from "axios";
import { AuthState } from "@/types";

//"http://localhost:5000/auth"
const URL = "https://auth-back-iota.vercel.app/auth";
axios.defaults.withCredentials = true;

// Create the Zustand store
export const useAuthStore = create<AuthState>((set) => ({
 user: null,
 isAuthenticated: false,
 error: null,
 isLoading: false,
 isChecking: false,
 message: null,

 signUp: async (name: string, email: string, password: string) => {
  set({ isLoading: true, error: null });

  try {
   const response = await axios.post(`${URL}/signup`, { email, password, name }); // Corrected endpoint
   set({ user: response.data.user, isAuthenticated: true, isLoading: false });
  } catch (error: any) {
   set({
    error: error.response?.data?.message,
    isLoading: false,
   });
   throw error;
  }
 },
 login: async (email, password) => {
  set({ isLoading: true, error: null });
  try {
   const response = await axios.post(`${URL}/login`, { email, password });
   set({
    isAuthenticated: true,
    user: response.data.user,
    error: null,
    isLoading: false,
   });
  } catch (error: any) {
   set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
   throw error;
  }
 },

 logout: async () => {
  set({ isLoading: true, error: null });
  try {
   await axios.post(`${URL}/logout`);
   document.cookie = "token=; Max-Age=0; path=/"; // Clear the cookie on logout
   set({ user: null, isAuthenticated: false, error: null, isLoading: false });
  } catch (error) {
   set({ error: "Error logging out", isLoading: false });
   throw error;
  }
 },

 verification: async (code: string) => {
  set({ isLoading: true, error: null });
  try {
   const response = await axios.post(`${URL}/verification`, { code });
   set({ user: response.data.user, isAuthenticated: true, isLoading: false });
   return response.data;
  } catch (error: any) {
   set({ error: error.response.data.message, isLoading: false });
   throw error;
  }
 },
 checkAuth: async () => {
  set({ isChecking: true });

  try {
   const response = await axios.get(`${URL}/checkauth`); // Token cookie is automatically sent
   set({ user: response.data.user, isAuthenticated: true, isChecking: false });
  } catch (error) {
   console.log(error);
   set({ isChecking: false });
  }
 },
 forgotPassword: async (email: string) => {
  set({ isLoading: true, error: null });
  try {
   const response = await axios.post(`${URL}/forgotPassword`, { email });
   set({ isLoading: false, message: response.data.message });
  } catch (error: any) {
   set({
    isLoading: false,
    error: error.response.data.message || "Error sending reset password email",
   });
   throw error;
  }
 },
 resetPassword: async (token: string, password: string) => {
  set({ isLoading: true, error: null });
  try {
   set({ isLoading: true });
   const response = await axios.post(`${URL}/resetPassword/${token}`, { password });
   set({ isLoading: false, message: response.data.message });
  } catch (error: any) {
   set({
    isLoading: false,
    error: error.response.data.message || "Error sending reset password email",
   });
   throw error;
  }
 },
}));
