import React, { useState } from "react";
import { TextField, Button, Typography, CircularProgress, Box, Alert,} from "@mui/material";
import { Link } from "react-router-dom";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSuccessMsg("Registration successful!");
      setFormData({ username: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (<Box
    component="form"
    onSubmit={handleSubmit}
    sx={{
      maxWidth: 400,
      mx: "auto",
      mt: 4,
      p: 3,
      boxShadow: 3,
      borderRadius: 2,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      bgcolor:"white"
    }}
  >
    <Typography variant="h5" textAlign="center">
      Register
    </Typography>

    {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
    {successMsg && <Alert severity="success">{successMsg}</Alert>}

    <TextField
      label="Username"
      name="username"
      value={formData.username}
      onChange={handleChange}
      fullWidth
      required
    />
    <TextField
      label="Email"
      name="email"
      type="email"
      value={formData.email}
      onChange={handleChange}
      fullWidth
      required
    />
    <TextField
      label="Password"
      name="password"
      type="password"
      value={formData.password}
      onChange={handleChange}
      fullWidth
      required
    />
    <TextField
      label="Confirm Password"
      name="confirmPassword"
      type="password"
      value={formData.confirmPassword}
      onChange={handleChange}
      fullWidth
      required
    />

    <Button type="submit" variant="contained" disabled={loading}>
      {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
    </Button>

    <Link to ="/Login">
    <Button
      variant="text"
      onClick={() => {
      }}
    >
    i'm already a member
    </Button></Link>
  </Box>
);
};

export default Register;