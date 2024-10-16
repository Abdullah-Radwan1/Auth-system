import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
 const token = req.cookies.token;
 if (!token) {
  return res.status(401).json({ success: false, message: "un-Authorized" });
 }
 try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
   return res.status(401).json({ success: false, message: "un-Authorized" });
  }
  req.userId = decoded.userId;
  next();
 } catch (error) {
  console.error("JWT verification error:", error);
  return res.status(500).json({ success: false, message: "Server error" });
 }
};
