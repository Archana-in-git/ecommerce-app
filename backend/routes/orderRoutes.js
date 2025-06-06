import express from "express";
import {
  createOrder,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getAllOrdersForAdmin,
  deleteOrder,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/admin", protect, admin, getAllOrdersForAdmin);
router.get("/:id", protect, getOrderById);
router.put("/:id/status", protect, admin, updateOrderStatus);
router.put("/:id/cancel", protect, cancelOrder);
router.delete("/:id", protect, admin, deleteOrder);

// router.get("/", protect, admin, getAllOrdersForAdmin);

export default router;
