const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // Body parser
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
})); // Cross-origin access

// Connect to Database
connectDB();

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
