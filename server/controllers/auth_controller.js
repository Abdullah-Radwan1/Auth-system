import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateTandSetC } from "../utils/generateTandSetC.js";
import { sendVerification, sendWelcomeEmail } from "../utils/emails.js";

export const signUp = async (req, res) => {
 const { email, name, password } = req.body;

 try {
  // Check if all fields are provided
  if (!name || !email || !password) {
   throw new Error("All fields are required");
  }

  // Check if user already exists
  const existedUser = await User.findOne({ email });
  if (existedUser) {
   return res.status(400).json({ success: false, message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcryptjs.hash(password, 10);

  // Generate verification token
  const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit token
  const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  // Create and save new user
  const user = new User({
   email,
   password: hashedPassword,
   name,
   verificationToken,
   verificationTokenExpiresAt,
  });
  await user.save();

  // Generate token and set cookies (if generateTandSetC is async, make sure to await it)
  await generateTandSetC(res, user._id);

  // Send verification email
  await sendVerification(user.email, verificationToken);

  // Respond with success, omitting the password from the user object
  res.status(201).json({
   success: true,
   message: "User was created successfully. Please check your email for verification.",
   user: { ...user._doc, password: undefined },
  });
 } catch (error) {
  return res.status(500).json({ success: "omg", message: error.message });
 }
};

//verification
export const verification = async (req, res) => {
 const { code } = req.body;
 try {
  const user = await User.findOne({
   verificationToken: code,
   verificationTokenExpiresAt: { $gt: Date.now() },
  });

  if (!user) {
   return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiresAt = undefined;
  await user.save();

  await sendWelcomeEmail(user.email, user.name);

  res.status(200).json({
   success: true,
   message: "Email verified successfully",
   user: {
    ...user._doc,
    password: undefined,
   },
  });
 } catch (error) {
  console.log("error in verifyEmail ", error);
  res.status(500).json({ success: false, message: "Server error" });
 }
};

export const logIn = async (req, res) => {
 const { email, password } = req.body;
 try {
  const user = await User.findOne({ email });
  if (!user) {
   return res.status(400).json({ success: false, message: "Invalid credentials" });
  }
  const isPasswordMatch = await bcryptjs.compare(password, user.password);
  if (!isPasswordMatch) {
   return res.status(400).json({ success: false, message: "Invalid credentials" });
  }
  generateTandSetC(res, user._id);
  user.lastLogin = new Date();
  await user.save();
  res.status(200).json({
   success: true,
   message: "Logged in successfully",
   user: {
    ...user._doc,
    password: undefined,
   },
  });
 } catch (error) {
  console.log("Error in login ", error);
  res.status(400).json({ success: false, message: error.message });
 }
};

export const logOut = async (req, res) => {
 res.clearCookie("token");
 res.status(200).json({ success: true, message: "logged out successfully" });
};
