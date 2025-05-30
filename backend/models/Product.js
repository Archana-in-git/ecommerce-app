const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  brand: String,
  imageUrl: String,
  // any other fields you need
});

module.exports = mongoose.model("Product", productSchema);
