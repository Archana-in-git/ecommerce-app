import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  brand: String,
  imageUrl: String,
});

const Product = mongoose.model("Product", productSchema);
export default Product;
