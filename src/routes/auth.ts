import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
const router = express.Router();

// User Signup
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({ username, email, password: hashedPassword, role });
  await newUser.save();

  const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
  res.status(201).json({ token });
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
  res.status(200).json({ token });
});

export default router;
