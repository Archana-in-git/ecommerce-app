import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import "../styles/Testimonials.css";

const testimonials = [
  {
    name: "Aarav Menon",
    comment: "Absolutely loved my new phone! Great service and quick delivery.",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Diya Thomas",
    comment:
      "This site offers the best deals on flagship phones. Highly recommended!",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Rahul Nair",
    comment: "Customer support was responsive and helpful. 5 stars!",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

const Testimonials = () => {
  return (
    <Box
      className="testimonials-container"
      sx={{ mt: 10, textAlign: "center" }}
    >
      <Typography className="testimonials-heading" variant="h5" gutterBottom>
        💬 What Our Customers Say
      </Typography>
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
        {testimonials.map((t, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="testimonial-card" sx={{ p: 3 }}>
                <Avatar
                  src={t.avatar}
                  alt={t.name}
                  sx={{ width: 60, height: 60, mx: "auto", mb: 2 }}
                />
                <CardContent>
                  <Typography
                    className="testimonial-name"
                    variant="subtitle1"
                    gutterBottom
                  >
                    {t.name}
                  </Typography>
                  <Typography className="testimonial-comment" variant="body2">
                    “{t.comment}”
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;
