require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://expense-tracker-eight-mu-99.vercel.app", // Your main Vercel domain
];

// Add logic to dynamically allow all Vercel preview URLs for your project
function isAllowed(origin) {
  // If the origin is in our static allowed list
  if (allowedOrigins.indexOf(origin) !== -1) {
    return true;
  }

  // If the origin is a Vercel preview URL for your project
  if (origin && origin.includes("apabrita-sarkars-projects.vercel.app")) {
    return true;
  }

  // If the origin is not set (e.g., direct API calls from same origin)
  if (!origin) {
    return true;
  }

  return false;
}

app.use(
  cors({
    origin: isAllowed,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// Routes
const expenseRoutes = require("./routes/expenseRoutes");
app.use("/api/expenses", expenseRoutes);

const exportRoutes = require("./routes/exportRoutes");
app.use("/", exportRoutes);

const chatbotRoutes = require("./routes/chatbotRoutes");
app.use("/api", chatbotRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
