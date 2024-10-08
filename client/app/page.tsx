"use client";

import { useAuthStore } from "@/store/store";
import Link from "next/link";

import { useEffect } from "react";

export default function Home() {
 const { user, checkAuth, logout, isAuthenticated } = useAuthStore();

 const handleLogout = () => {
  logout();
 };
 useEffect(() => {
  checkAuth();
  console.log(user);
 }, [checkAuth]);

 return (
  <>
   <Link href={"/login"} onClick={handleLogout} className="btn btn-ghost">
    logout
   </Link>
  </>
 );
}
