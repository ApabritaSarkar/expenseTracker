const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// 🔐 Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "Username exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
});

// 🔓 Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("Login attempt for username:", username); // Log the incoming username
  console.log("Password provided (plain-text):", password); // Log the plain-text password (BE CAREFUL IN PRODUCTION)

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found for username:", username); // Log if user not found
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("User found:", user.username); // Log the found username
    console.log("Stored hashed password:", user.password); // Log the stored hash

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("bcrypt.compare result (isMatch):", isMatch); // Log the result of the comparison

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "2h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    res.json({ message: "Logged in" });
  } catch (err) {
    console.error("Login route error:", err); // Log any unexpected errors
    res.status(500).json({ message: "Login failed" });
  }
});

// 🔒 Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

module.exports = router;
