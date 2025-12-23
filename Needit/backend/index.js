const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const { checkForAuthenticationCookie } = require("./middleware/authenticate");
const routerBlogs = require("./routes/Blogs");
const routerUser = require("./routes/User");

const app = express();
const PORT = 3010;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS (Frontend URL)
app.use(
  cors({
    origin: "https://needit-interview.vercel.app",
    credentials: true,
  })
);

// ✅ FIXED MongoDB URL (LOCAL)
const MONGO_URI = "mongodb://127.0.0.1:27017/needit";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Auth middleware (skip login/signup)
app.use((req, res, next) => {
  if (req.path === "/login" || req.path === "/signup") {
    return next();
  }
  checkForAuthenticationCookie("token")(req, res, next);
});

// Routes
app.use("/", routerUser);
app.use("/blogs", routerBlogs);

// Root route
app.get("/", checkForAuthenticationCookie("token"), (req, res) => {
  res.json({ user: req.user });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
