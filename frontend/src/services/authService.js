import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const register = (userData) =>
  axios.post(`${BASE_URL}/auth/register`, userData);

export const login = (credentials) =>
  axios.post(`${BASE_URL}/auth/login`, credentials);

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
