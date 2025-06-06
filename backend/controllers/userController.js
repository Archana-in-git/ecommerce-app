import Newsletter from "../models/Newsletter.js"; // ✅ ESM syntax
import User from "../models/User.js";

const signupNewsletter = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const newSubscriber = new Newsletter({ name, email });
    await newSubscriber.save();
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get logged-in user's profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc    Update logged-in user's profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.profilePicture = req.body.profilePicture || user.profilePicture;

    // If password update is allowed, hash new password
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      profilePicture: updatedUser.profilePicture,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update user status (suspend/ban) - Admin Only
// @route   PUT /api/users/:id/status
// @access  Private/Admin
export const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { isSuspended, isBanned } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Don't allow modifying self
    if (req.user._id.toString() === user._id.toString()) {
      return res.status(400).json({ message: "Cannot modify own status" });
    }

    if (typeof isSuspended !== "undefined") user.isSuspended = isSuspended;
    if (typeof isBanned !== "undefined") user.isBanned = isBanned;

    const updated = await user.save();
    res.json({
      _id: updated._id,
      username: updated.username,
      email: updated.email,
      isSuspended: updated.isSuspended,
      isBanned: updated.isBanned,
      role: updated.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
