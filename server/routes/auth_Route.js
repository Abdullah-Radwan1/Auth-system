import express from "express";
import { logIn, logOut, signUp } from "../controllers/auth_controller.js";

const router = express.Router();

router.post("/signup", signUp); // Signup route
router.post("/login", logIn); // Login route
router.post("/logout", logOut); // Logout route

export default router;
