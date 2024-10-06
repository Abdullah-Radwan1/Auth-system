"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/Input";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
const page = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 return (
  <motion.main
   className="max-w-md container "
   initial={{ opacity: 0, y: 30 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.7 }}
  >
   <motion.div className=" p-4  rounded-t-md pt-8  bg-gray-600 bg-opacity-50 shadow-xl ">
    <h1 className="text-center font-bold text-green-400 text-2xl">Welcome Back !</h1>
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
    />{" "}
    <button className=" flex m-auto btn btn-ghost mb-4">login</button>
    <div className=" flex justify-center">
     <Link className="text-green-400 " href={"/forgot-password"}>
      forgot password ?
     </Link>
    </div>
   </motion.div>
   <div className="text-center py-4 rounded-b-lg  bg-slate-600">
    <p>
     don't have an accound?{" "}
     <Link className="text-green-400" href={"/signup"}>
      sign up
     </Link>
    </p>
   </div>
  </motion.main>
 );
};

export default page;
