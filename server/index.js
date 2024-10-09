import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth_Route.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5000;
const CORS = process.env.CORS;
dotenv.config();

// Initialize express app
const app = express();

// Middleware
// {
//           origin: `${CORS}`,
//           credentials: true,
//          }),
app.use(cors()); // Update to your frontend origin
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
