import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  updateUserStatus,
} from "../controllers/userController.js";
import Newsletter from "../models/Newsletter.js";
import upload from "../middleware/upload.js";
import User from "../models/User.js";

const router = express.Router();

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Newsletter signup route
router.post("/newsletter/signup", async (req, res) => {
  try {
    const { name, email } = req.body;
    const existing = await Newsletter.findOne({ email });

    if (existing) {
      return res.status(400).json({ message: "Already subscribed!" });
    }

    const newsletter = new Newsletter({ name, email });
    await newsletter.save();

    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Upload profile picture route
router.post(
  "/profile/upload",
  protect,
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.profilePicture = `/uploads/${req.file.filename}`;
      await user.save();

      res.json({
        message: "Profile picture uploaded",
        imageUrl: user.profilePicture,
      });
    } catch (error) {
      console.error("Upload route error:", error); // <== ADD THIS
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// User routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// Admin routes
router.get("/", protect, admin, getAllUsers);
router.put("/:id/status", protect, admin, updateUserStatus);

export default router;
