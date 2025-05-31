import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  storage: { type: String, required: true },
  price: { type: Number, required: true },
  colorOptions: [{ type: String }],
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    display: { type: String },
    processor: { type: String },
    battery: { type: String },
    camera: { type: String },
    os: { type: String },
    sim: { type: String },
    material: { type: String },
    weight: { type: String },
    imageUrls: [{ type: String }], // ✅ Corrected from imageUrl
    variants: [variantSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
