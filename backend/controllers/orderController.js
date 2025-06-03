import Order from "../models/Order.js";
import asyncHandler from "express-async-handler";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingInfo, paymentMethod, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  const order = new Order({
    user: req.user._id, // requires auth middleware
    orderItems,
    shippingInfo,
    paymentMethod,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc    Get logged in user's orders
// @route   GET /api/orders/user
// @access  Private
export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(orders);
});

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    if (order.user._id.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to view this order");
    }
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
