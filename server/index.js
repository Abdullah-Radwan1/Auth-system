import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth_Route.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialize express app
const app = express();

// CORS Middleware
app.use(
 cors({
  origin: true, // Allow requests from any origin
  credentials: true, // Allow credentials such as cookies to be sent
 }),
);

// Other middleware
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Mount the routes
app.use("/auth", authRoutes);

// Connect to the database and start the server
mongoose
 .connect(process.env.MONGO_URI)
 .then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
 })
 .catch((err) => console.error("MongoDB connection error:", err));
