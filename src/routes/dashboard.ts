import express from "express";
import { verifyToken, isAdmin } from "../middleware/auth";
const router = express.Router();

// Get Dashboard (For Users)
router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Welcome to your dashboard" });
});

// Admin-Only Route
router.get("/admin", [verifyToken, isAdmin], (req, res) => {
  res.status(200).json({ message: "Admin Dashboard" });
});

export default router;
