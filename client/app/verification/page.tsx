"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/store";
import toast from "react-hot-toast";

const Page = () => {
 const [code, setCode] = useState(["", "", "", "", "", ""]);
 const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
 const router = useRouter();
 const { verification, isLoading, isAuthenticated, error } = useAuthStore();
 const handleChange = (index: number, value: string) => {
  const newCode = [...code];
  newCode[index] = value;
  setCode(newCode);

  // Move focus to the next input field if value is entered
  if (value && index < 5) {
   inputRefs.current[index + 1]?.focus();
  }
 };

 const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Backspace" && !code[index] && index > 0) {
   inputRefs.current[index - 1]?.focus();
  }
 };

 const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
  e.preventDefault(); // Prevent default paste behavior
  const pastedData = e.clipboardData.getData("text").slice(0, 6); // Get up to 6 characters
  const newCode = pastedData.split("");

  // Fill the code array with pasted characters
  setCode((prevCode) => {
   const updatedCode = [...prevCode];
   for (let i = 0; i < newCode.length; i++) {
    updatedCode[i] = newCode[i];
   }

   // Focus on the next empty input after pasting
   const nextEmptyIndex = newCode.length < 6 ? newCode.length : 5;
   inputRefs.current[nextEmptyIndex]?.focus();
   return updatedCode;
  });
 };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const verificationCode = code.join("");
  try {
   console.log(verificationCode);
   await verification(verificationCode);
   toast.success("email was verifies successfully");
   router.push("/"); // Redirect after successful sign up
  } catch (error) {
   console.log(error);
  }
 };

 // Auto submit when all fields are filled
 useEffect(() => {
  if (code.every((digit: string) => digit !== "")) {
   handleSubmit(new Event("submit") as unknown as React.FormEvent<HTMLFormElement>);
  }
 }, [code]);

 return (
  <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
   <motion.div className="p-8">
    <h1 className="text-center font-bold text-green-400 text-2xl">Verify your email</h1>
    <p className="text-center py-5">Enter the 6 digits from your email address</p>
    <form onSubmit={handleSubmit} className="space-y-6">
     <div className="flex justify-between">
      {code.map((digit, index) => (
       <input
        key={index}
        //@ts-ignore
        ref={(el) => (inputRefs.current[index] = el)}
        type="text"
        maxLength={1} // Single character per input
        value={digit}
        onChange={(e) => handleChange(index, e.target.value)}
        onKeyDown={(e) => handleKeyDown(index, e)}
        onPaste={handlePaste} // Handle paste event
        className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
       />
      ))}
     </div>
     {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}{" "}
     <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="submit"
      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
     >
      Submit
     </motion.button>
    </form>
   </motion.div>
  </div>
 );
};

export default Page;
