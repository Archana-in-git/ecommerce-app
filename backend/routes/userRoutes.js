import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import Newsletter from "../models/Newsletter.js";

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

export default router;
