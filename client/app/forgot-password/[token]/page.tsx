"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/store";
import Input from "@/components/Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

const page = () => {
 const [password, setPassword] = useState("");
 const { token } = useParams();
 const [confirmPassword, setConfirmPassword] = useState("");
 const { resetPassword, error, isLoading, message } = useAuthStore();
 const router = useRouter();
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  console.log(token);

  try {
   e.preventDefault();
   if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
   }
   await resetPassword(token, password);
   toast.success("Password reset successfully, redirecting to login page...");
   setTimeout(() => {
    router.push("/login");
   }, 1500);
   clearTimeout;
  } catch (error: any) {
   console.error(error);
   toast.error(error.message || "Error resetting password");
  }
 };
 return (
  <motion.div
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.5 }}
   className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
  >
   <div className="p-8">
    <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
     Reset Password
    </h2>
    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

    <form onSubmit={handleSubmit}>
     <Input
      icon={Lock}
      type="password"
      placeholder="New Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
     />

     <Input
      icon={Lock}
      type="password"
      placeholder="Confirm New Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
     />

     <button className="btn btn-ghost m-auto my-3 flex">
      {" "}
      {isLoading ? "Resetting..." : "Set New Password"}
     </button>
    </form>
   </div>
  </motion.div>
 );
};

export default page;
