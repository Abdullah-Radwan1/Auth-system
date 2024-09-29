"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
const Signup = () => {
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 return (
  <motion.div
   initial={{ opacity: 0, y: 30 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.7 }}
   className=" container rounded-md py-8 px-5 max-w-md  bg-gray-600 bg-opacity-50 backdrop-filter backdrop-blur-xl  shadow-xl 
			overflow-hidden"
  >
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

   <button className=" flex m-auto btn btn-ghost">Sign Up</button>
  </motion.div>
 );
};

export default Signup;
