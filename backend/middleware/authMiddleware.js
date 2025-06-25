const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id }; // only attach user ID for safety
    next();
  } catch (error) {
    console.error("JWT Verification Failed:", error.message);
    res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};

module.exports = authMiddleware;
