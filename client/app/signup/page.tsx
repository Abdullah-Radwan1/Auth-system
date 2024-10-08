"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/Input";
import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import PasswordStrengthMeter from "@/components/PasswordMeter";
import { useAuthStore } from "@/store/store";
import { useRouter } from "next/navigation";

const Signup = () => {
 const { isAuthenticated, isChecking, isLoading, signUp, error } = useAuthStore();

 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const router = useRouter();
 if (isAuthenticated) {
  router.push("/");
  return;
 }
 const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // Prevent default form submission behavior
  try {
   await signUp(name, email, password);
   router.push("/verification"); // Redirect after successful sign up
  } catch (error) {
   console.log(error);
  }
 };

 return (
  <motion.main
   className="max-w-md container"
   initial={{ opacity: 0, y: 30 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.7 }}
  >
   <motion.div className="flex flex-col justify-between p-4 rounded-t-md pt-8 bg-gray-600 bg-opacity-50 shadow-xl ">
    <h1 className="text-center font-bold text-green-400 text-2xl">Create Account</h1>

    {/* Form with onSubmit */}
    <form onSubmit={handleSignUp}>
     <Input
      icon={User}
      type="text"
      placeholder="Full Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
     />
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

     {/* Error message */}
     {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

     {/* Submit button */}
     <button type="submit" className="flex m-auto btn btn-ghost">
      {isLoading ? (
       <div className="border-t-4 border-gray-500 rounded-full w-8 h-8 animate-spin"></div>
      ) : (
       "Sign Up"
      )}
     </button>
    </form>

    {/* Password strength meter */}
    <PasswordStrengthMeter password={password} />
   </motion.div>

   {/* Login prompt */}
   <div className="text-center py-4 rounded-b-lg bg-slate-600">
    <p>
     already have an account?{" "}
     <Link className="text-green-400" href="/login">
      login
     </Link>
    </p>
   </div>
  </motion.main>
 );
};

export default Signup;
