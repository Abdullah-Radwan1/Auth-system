import express from "express";
import {
 logIn,
 logOut,
 signUp,
 verification,
 forgotPassword,
} from "../controllers/auth_controller.js";

const router = express.Router();

router.post("/signup", signUp); // Signup route
router.post("/verification", verification); // Login route
router.post("/login", logIn); // Login route
router.post("/logout", logOut); // Logout route
router.post("/forgot-password", forgotPassword); // Logout route
export default router;
