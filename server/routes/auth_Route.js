import express from "express";
import {
 logIn,
 logOut,
 signUp,
 verification,
 forgotPassword,
 resetPassword,
 checkAuth,
} from "../controllers/auth_controller.js";
import { sendResetSuccessEmail } from "../utils/emails.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.get("/checkauth", verifyToken, checkAuth);
router.post("/signup", signUp); // Signup route
router.post("/verification", verification); // Login route
router.post("/login", logIn); // Login route
router.post("/logout", logOut); // Logout route

//password
router.post("/forgotpassword", forgotPassword); // Logout route
router.post("/resetPassword/:token", resetPassword);
sendResetSuccessEmail;
export default router;
