import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateTandSetC } from "../utils/generateTandSetC.js"; // Assuming this is a utility for token generation

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
  const verificationToken = Math.floor(100000 + Math.random() * 20000).toString();
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
  generateTandSetC(res, user._id);
  sendVerification(user.email, verificationToken);
  // Respond with success, omitting the password from the user object
  res.status(201).json({
   success: true,
   message: "User was created successfully",
   user: { ...user._doc, password: undefined },
  });
 } catch (error) {
  // Handle errors and respond with a message
  return res.status(500).json({ success: false, message: error.message });
 }
};

export const logIn = async (req, res) => {
 res.send("Log in logic here");
};

export const logOut = async (req, res) => {
 res.send("Log out logic here");
};
