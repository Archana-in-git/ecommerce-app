import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
console.log(
  "API Base URL:",
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
);

// Get all products
export const getAllProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await axios.get(`${BASE_URL}/products?${params}`);
  return response.data;
};

// Get single product by ID
export const getProductById = async (id) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
};

export const addProduct = async (productData) => {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, // if using JWT
    },
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error("Failed to add product");
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete");
  return res.json();
};

// Get all products for admin (authenticated)
export const getAdminProducts = async () => {
  const res = await fetch("/api/products/admin", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch admin products");
  return res.json();
};
