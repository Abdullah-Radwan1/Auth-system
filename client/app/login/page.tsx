"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Input from "@/components/Input";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/store"; // Use Zustand hook
import { useRouter } from "next/navigation";

const Page = () => {
 const router = useRouter();
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const { login, user, isLoading, isAuthenticated, error } = useAuthStore(); // Use Zustand hook
 console.log("login component ");
 useEffect(() => {
  if (isAuthenticated) {
   router.push("/");
  }
 }, [isAuthenticated, router]); // Redirect only inside useEffect

 const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
   await login(email, password);
   router.push("/"); // Redirect after successful login
  } catch (error) {
   console.log(error);
  }
 };

 return (
  <motion.main
   className="max-w-md container"
   initial={{ opacity: 0, y: 30 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.3 }}
  >
   <motion.div className="p-4 rounded-t-md pt-8 bg-gray-600 bg-opacity-50 shadow-xl">
    <h1 className="text-center font-bold text-green-400 text-2xl">Welcome Back!</h1>
    <form onSubmit={handleLogin}>
     <Input
      icon={Mail}
      type="email"
      placeholder="Email Address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
     />
     <Input
      icon={Lock}
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
     />
     {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
     <button type="submit" className="flex m-auto btn btn-ghost mb-4">
      Login
     </button>
    </form>
    <div className="flex justify-center">
     <Link className="text-green-400 pb-4 pt-2" href={"/forgot-password"}>
      Forgot password?
     </Link>
    </div>
   </motion.div>
   <div className="text-center py-4 rounded-b-lg bg-slate-600">
    <p>
     Don't have an account?{" "}
     <Link className="text-green-400" href={"/signup"}>
      Sign up
     </Link>
    </p>
   </div>
  </motion.main>
 );
};

export default Page;
