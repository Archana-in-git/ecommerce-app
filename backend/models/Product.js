import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  storage: { type: String, required: true }, // e.g. "128GB", "256GB"
  price: { type: Number, required: true }, // price corresponding to that storage
  colorOptions: [{ type: String }], // array of colors available for this variant
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true }, // brand is important, make required
    display: { type: String },
    processor: { type: String },
    battery: { type: String },
    camera: { type: String },
    os: { type: String },
    sim: { type: String },
    material: { type: String },
    weight: { type: String },
    imageUrl: { type: String },
    variants: [variantSchema], // list of storage+price+color combos
  },
  {
    timestamps: true, // optional, adds createdAt and updatedAt
  }
);

export default mongoose.model("Product", productSchema);
