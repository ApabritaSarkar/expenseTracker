require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

// 🌐 Allowed CORS Origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://expense-tracker-eight-mu-99.vercel.app", // Production
];

// ✅ Allow all preview deployments
function isAllowed(origin) {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  if (origin.includes("apabrita-sarkars-projects.vercel.app")) return true;
  return false;
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowed(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ Trust proxy in production (for cookies)
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// ✅ Routes
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/", require("./routes/exportRoutes"));
app.use("/api", require("./routes/chatbotRoutes"));
app.use("/api/auth", require("./routes/auth"));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
