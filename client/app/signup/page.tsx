"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/Input";
import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import PasswordStrengthMeter from "@/components/PasswordMeter";

import { AuthStore } from "@/store/store";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/Loader";
const Signup = () => {
 const { isAuthenticated, isChecking, isLoading, signup, error } = AuthStore();
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const router = useRouter();
 const handleSignUp = async () => {
  try {
   await signup(email, name, password);
   console.log("object");
   router.push("/verification");
  } catch (error) {
   console.log(error);
  }
 };

 return (
  <motion.main
   className=" max-w-md container"
   initial={{ opacity: 0, y: 30 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.7 }}
  >
   <motion.div className="flex flex-col  justify-between p-4  rounded-t-md pt-8  bg-gray-600 bg-opacity-50 shadow-xl ">
    <h1 className="text-center font-bold text-green-400 text-2xl">Create Account</h1>
    <Input
     icon={User}
     type="text"
     placeholder="Full Name"
     value={name}
     onChange={(e: any) => setName(e.target.value)}
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
    {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
    <button onClick={handleSignUp} className=" flex m-auto btn btn-ghost">
     {" "}
     {isLoading ? (
      <div className="border-t-4  border-gray-500 rounded-full w-8 h-8 animate-spin"></div>
     ) : (
      "Sign Up"
     )}
    </button>
    {/* passwordMeter */}
    <PasswordStrengthMeter password={password} />

    {/* login */}
   </motion.div>
   <div className="text-center py-4 rounded-b-lg  bg-slate-600">
    <p>
     already have an accound ?{" "}
     <Link className="text-green-400" href={"/login"}>
      login
     </Link>
    </p>
   </div>
  </motion.main>
 );
};

export default Signup;
