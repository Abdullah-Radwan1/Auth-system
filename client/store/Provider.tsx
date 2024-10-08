"use client";
import React, { useEffect } from "react";
import { useAuthStore } from "./store"; // Ensure you import the Zustand hook
import { useRouter } from "next/navigation";

const Provider = ({ children }: { children: React.ReactNode }) => {
 const router = useRouter();
 const { user, checkAuth, isAuthenticated } = useAuthStore(); // Use Zustand hook here

 useEffect(() => {
  checkAuth(); // Call the checkAuth function to verify authentication
  if (!isAuthenticated) {
   router.push("/login");
  } else if (!user?.isVerified) {
   router.push("/verification");
  }
 }, [checkAuth, isAuthenticated, user, router]); // Add user and isAuthenticated to the dependency array

 return <>{children}</>;
};

export default Provider;
