import axios from "./api"; // adjust path if needed
export const sendNewsletterSignup = async ({ name, email }) => {
  const res = await axios.post("/newsletter/signup", { name, email });
  return res.data;
};
// src/services/userService.js

// Fetch current user profile
export const getUserProfile = async () => {
  const response = await axios.get("/users/profile");
  return response.data;
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  const response = await axios.put("/users/profile", profileData);
  return response.data;
};

export const getAllUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`, { withCredentials: true });
  return data;
};

export const updateUserStatus = async (userId, updates) => {
  const { data } = await axios.put(`${BASE_URL}/users/${userId}/status`, updates, {
    withCredentials: true,
  });
  return data;
};
