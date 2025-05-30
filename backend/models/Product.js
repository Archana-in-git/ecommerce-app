import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  storage: { type: String, required: true },
  price: { type: Number, required: true },
  colorOptions: [{ type: String }],
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: String,
    display: String,
    processor: String,
    battery: String,
    camera: String,
    os: String,
    sim: String,
    material: String,
    weight: String,
    imageUrls: {
      type: [String],
      required: false,
    },
    variants: [variantSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
