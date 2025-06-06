// src/services/userService.js
import api from "./api"; // centralized axios instance with baseURL and token
import axios from "axios";

// Newsletter signup
export const sendNewsletterSignup = async ({ name, email }) => {
  const res = await api.post("/newsletter/signup", { name, email });
  return res.data;
};

// Fetch current logged-in user profile
export const getUserProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

// Update logged-in user profile
export const updateUserProfile = async (profileData) => {
  const response = await api.put("/users/profile", profileData);
  return response.data;
};

// Fetch all users (admin)
export const getAllUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};

// Update user status (suspend/ban) - admin only
export const updateUserStatus = async (userId, updates) => {
  const { data } = await api.put(`/users/${userId}/status`, updates);
  return data;
};

export const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await axios.post("/api/users/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });

  return data.imageUrl;
};
