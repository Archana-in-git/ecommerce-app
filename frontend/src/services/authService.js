// src/services/authService.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "/api/auth"; // fallback to proxy

export const register = (userData) => axios.post(`${API}/register`, userData);

export const login = (credentials) => axios.post(`${API}/login`, credentials);

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
