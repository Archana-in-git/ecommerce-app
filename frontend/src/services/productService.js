import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
console.log(
  "API Base URL:",
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
);

// Get all products
export const getAllProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};

// Get single product by ID
export const getProductById = async (id) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
};
