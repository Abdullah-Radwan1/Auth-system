"use client";

import { useAuthStore } from "@/store/store";

import { useEffect } from "react";

export default function Home() {
 const { user, checkAuth, logout, isAuthenticated } = useAuthStore();

 const handleLogout = () => {
  logout();
  console.log(isAuthenticated);
 };
 useEffect(() => {
  checkAuth();
  console.log(user);
 }, [checkAuth]);

 return (
  <>
   <button onClick={handleLogout} className="btn btn-ghost">
    logout
   </button>
  </>
 );
}
