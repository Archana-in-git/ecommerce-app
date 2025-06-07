import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"; // ✅
import path from "path";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
const app = express();
connectDB();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // ✅ Required for cookies
  })
);

app.use(express.json());
app.use(cookieParser()); // ✅ Use it early

app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); // ⛔ move after cors & cookieParser

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
// Error handler
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
