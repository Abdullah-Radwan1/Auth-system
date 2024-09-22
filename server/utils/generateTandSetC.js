import jwt from "jsonwebtoken";

export const generateTandSetC = (res, userId) => {
 const token = jwt.sign({ userId }, process.env.jWT_SECRET, { expiresIn: "1d" });

 res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 15 * 24 * 60 * 1000,
 });
 return token;
};
