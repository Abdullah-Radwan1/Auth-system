// middleware.ts
import { NextResponse, NextRequest } from "next/server";

// Middleware function
export function middleware(req: NextRequest) {
 // Get the token from cookies using the NextRequest API
 const token = req.cookies.get("token"); // Read the token from the cookie

 // Define your protected routes
 const protectedRoutes = ["/", "/home"]; // Protecting root and home routes

 // If the user is not authenticated (no token) and trying to access a protected route, redirect to the login page
 if (!token && protectedRoutes.some((route) => req.nextUrl.pathname === route)) {
  return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login
 }

 // If authenticated (token exists) or accessing non-protected routes, allow the request
 return NextResponse.next();
}

// Specify paths for which the middleware should run
export const config = {
 matcher: ["/", "/home"], // Only run middleware on root and home routes
};
