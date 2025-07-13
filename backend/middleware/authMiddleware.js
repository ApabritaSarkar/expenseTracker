const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  // ✅ Get token from Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id }; // only attach user ID
    next();
  } catch (error) {
    console.error("JWT Verification Failed:", error.message);
    res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};

module.exports = authMiddleware;
