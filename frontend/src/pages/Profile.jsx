import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { getUserProfile, updateUserProfile } from "../services/userService";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    profilePicture: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    }
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(profile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile");
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, profilePicture: imageUrl });
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" gutterBottom>
        User Profile
      </Typography>

      {/* Avatar and image upload */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Avatar
          src={profile.profilePicture}
          sx={{ width: 80, height: 80, mr: 2 }}
        />
        <Button variant="outlined" component="label">
          Upload Picture
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Button>
      </Box>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={profile.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={profile.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Phone"
          name="phone"
          fullWidth
          margin="normal"
          value={profile.phone}
          onChange={handleChange}
        />
        <TextField
          label="Address"
          name="address"
          fullWidth
          margin="normal"
          multiline
          rows={2}
          value={profile.address}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Save Profile
        </Button>
      </form>
    </Box>
  );
};

export default UserProfile;
