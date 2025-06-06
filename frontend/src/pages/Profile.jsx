import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { getUserProfile, updateUserProfile } from "../services/userService";
import axios from "../services/api"; // or wherever your axios instance is

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    profilePicture: "",
  });

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      await updateUserProfile(profile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      setLoading(true);
      // Assuming your backend upload endpoint is /api/users/profile/upload
      const response = await axios.post("/users/profile/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // important for cookies/auth
      });

      // The backend should respond with something like { imageUrl: "/uploads/filename.jpg" }
      const imageUrl = response.data.imageUrl;

      setProfile((prev) => ({ ...prev, profilePicture: imageUrl }));
    } catch (error) {
      console.error("Failed to upload image", error);
      alert("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Use your CSS variable or hardcode your dark background color here:
  const darkBgAlt = "rgb(20, 20, 30)"; // fallback for var(--dark-bg-alt)

  return (
    <Box
      sx={{
        maxWidth: 420,
        width: "90%",
        mx: "auto",
        mt: 8,
        p: "2.5rem 2rem",
        backgroundColor: "var(--dark-bg-alt, " + darkBgAlt + ")",
        borderRadius: "12px",
        boxShadow: "0 0 20px rgba(45, 237, 45, 0.973)",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Typography
        className="login-title"
        variant="h4"
        component="h1"
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          mb: "1.5rem",
          fontWeight: 600,
          color: "#fff",
        }}
      >
        User Profile
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        {profile.profilePicture ? (
  <Avatar
    src={profile.profilePicture}
    alt={profile.username || "User Avatar"}
    sx={{ width: 80, height: 80 }}
  />
) : (
  <Typography variant="body2" sx={{ mt: 1, color: "#ccc" }}>
    No profile picture uploaded
  </Typography>
)}


        <label htmlFor="profile-upload">
          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
          <Button
            variant="outlined"
            component="span"
            sx={{
              color: "#00ff7f",
              borderColor: "#00ff7f",
              borderRadius: "8px",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#00ff7f",
                color: "#000",
                borderColor: "#00ff7f",
              },
            }}
          >
            Upload Picture
          </Button>
        </label>
      </Box>

      <form onSubmit={handleSubmit} noValidate>
        {/** TextField style matching `.login-input` */}
        <TextField
          label="Name"
          name="username"
          value={profile.username}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          variant="filled"
          InputProps={{
            sx: {
              backgroundColor: "#2c2c3c",
              borderRadius: "8px",
              color: "#fff",
              "& .MuiInputBase-input": {
                color: "#fff",
              },
              "& .MuiInputLabel-root": {
                color: "#aaa",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#00ff7f",
              },
              "& .MuiFilledInput-root:before": {
                borderBottom: "none",
              },
              "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                borderBottom: "none",
              },
            },
          }}
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={profile.email}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          variant="filled"
          InputProps={{
            sx: {
              backgroundColor: "#2c2c3c",
              borderRadius: "8px",
              color: "#fff",
              "& .MuiInputBase-input": {
                color: "#fff",
              },
              "& .MuiInputLabel-root": {
                color: "#aaa",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#00ff7f",
              },
              "& .MuiFilledInput-root:before": {
                borderBottom: "none",
              },
              "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                borderBottom: "none",
              },
            },
          }}
        />

        <TextField
          label="Phone"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="filled"
          InputProps={{
            sx: {
              backgroundColor: "#2c2c3c",
              borderRadius: "8px",
              color: "#fff",
              "& .MuiInputBase-input": {
                color: "#fff",
              },
              "& .MuiInputLabel-root": {
                color: "#aaa",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#00ff7f",
              },
              "& .MuiFilledInput-root:before": {
                borderBottom: "none",
              },
              "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                borderBottom: "none",
              },
            },
          }}
        />

        <TextField
          label="Address"
          name="address"
          value={profile.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
          variant="filled"
          InputProps={{
            sx: {
              backgroundColor: "#2c2c3c",
              borderRadius: "8px",
              color: "#fff",
              "& .MuiInputBase-input": {
                color: "#fff",
              },
              "& .MuiInputLabel-root": {
                color: "#aaa",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#00ff7f",
              },
              "& .MuiFilledInput-root:before": {
                borderBottom: "none",
              },
              "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                borderBottom: "none",
              },
            },
          }}
        />

        <Button
          type="submit"
          disabled={loading}
          fullWidth
          sx={{
            mt: 2,
            py: 1.1,
            fontWeight: 600,
            fontSize: "1rem",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            color: "#fff",
            transition: "opacity 0.3s ease",
            "&:hover": {
              opacity: 0.9,
              backgroundColor: "#0069d9",
            },
          }}
        >
          {loading ? "Saving..." : "Save Profile"}
        </Button>
      </form>
    </Box>
  );
};

export default Profile;
