import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Alert } from "@mui/material";
import { motion } from "framer-motion";
import { sendNewsletterSignup } from "../services/userService";

const NewsletterSignup = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await sendNewsletterSignup(formData);
      setSuccess("Thank you for subscribing!");
      setFormData({ name: "", email: "" });
    } catch (err) {
      setError("Subscription failed. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          backgroundColor: "var(--dark-bg-alt)",
          color: "var(--text-color)",
          p: 4,
          borderRadius: "var(--border-radius)",
          boxShadow: "var(--shadow-soft)",
          mt: 6,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "var(--text-color)" }}
        >
          Stay Updated with Our Newsletter
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "#ccc" }}>
          Get the latest deals and smartphone news directly to your inbox.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="filled"
                InputProps={{
                  style: {
                    backgroundColor: "#2a2e36",
                    color: "#fff",
                    borderRadius: "8px",
                  },
                }}
                InputLabelProps={{
                  style: { color: "#bbb" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                fullWidth
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="filled"
                InputProps={{
                  style: {
                    backgroundColor: "#2a2e36",
                    color: "#fff",
                    borderRadius: "8px",
                  },
                }}
                InputLabelProps={{
                  style: { color: "#bbb" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "var(--primary-color)",
                  color: "#fff",
                  textTransform: "none",
                  borderRadius: "8px",
                  ":hover": {
                    backgroundColor: "#5aa246",
                  },
                }}
              >
                Subscribe
              </Button>
            </Grid>
          </Grid>
        </form>

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    </motion.div>
  );
};

export default NewsletterSignup;
