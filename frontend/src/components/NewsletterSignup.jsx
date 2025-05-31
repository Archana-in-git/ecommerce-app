import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Alert } from "@mui/material";
import { motion } from "framer-motion";
import { sendNewsletterSignup } from "../services/userService"; // ✅ create this function

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
      <Box sx={{ backgroundColor: "#f5f5f5", p: 4, borderRadius: 3, mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Stay Updated with Our Newsletter
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Get latest deals and smartphone news directly to your inbox.
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
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">
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
