import jwt from "jsonwebtoken";

export const generateTandSetC = async (res, userId) => {
 const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
  expiresIn: "7d",
 });
 // store in the cookies the toekn
 res.cookie("token", token, {
  httpOnly: process.env.NODE_ENV === "production",
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
 });

 return token;
};
