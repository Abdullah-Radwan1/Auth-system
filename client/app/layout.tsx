import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Provider from "@/store/Provider";

export const metadata: Metadata = {
 title: "Create Next App",
 description: "Generated by create next app",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en">
   <body className="min-h-screen  flex items-center justify-center ">
    {children}
    <Toaster />
   </body>
  </html>
 );
}
