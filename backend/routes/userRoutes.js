const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Register User
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    res.json({ msg: "Login successful", user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Error during login:', error); 
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
