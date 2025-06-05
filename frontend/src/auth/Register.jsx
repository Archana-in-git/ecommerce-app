import React, { useState } from "react";
import { Typography, CircularProgress, Box, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/login.css"; // Ensure this file is imported
import { register } from "../services/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setErrorMsg("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password should be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);

      const response = await register({ username, email, password });
      setSuccessMsg(response.data.message || "Registration successful!");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setErrorMsg(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="login-container">
      <Typography variant="h4" className="login-title">
        Create Account
      </Typography>

      {errorMsg && (
        <Alert severity="error" className="login-error">
          {errorMsg}
        </Alert>
      )}
      {successMsg && <Alert severity="success">{successMsg}</Alert>}

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="login-input"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="login-input"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="login-input"
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="login-input"
      />

      <div className="login-buttons">
        <button type="submit" className="login-btn login" disabled={loading}>
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Register"
          )}
        </button>
        <Link to="/login">
          <button type="button" className="login-btn cancel">
            I'm already a member
          </button>
        </Link>
      </div>
    </Box>
  );
};

export default Register;
