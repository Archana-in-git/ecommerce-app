import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import path from "path";
import uploadRoutes from "./routes/uploadRoutes.js";


dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
connectDB();

const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/api/users", uploadRoutes);


const allowedOrigins = ["http://localhost:5173"]; // your frontend URL

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // allow cookies and auth headers
  })
);

app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
// after all routes
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
