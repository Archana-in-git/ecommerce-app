import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
console.log(
  "API Base URL:",
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
);
// Utility: get token from localStorage
const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

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

// Add a new product (admin)
export const addProduct = async (productData) => {
  const response = await axios.post(`${BASE_URL}/products`, productData, {
    headers: {
      ...authHeader(),
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Delete a product (admin)
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${BASE_URL}/products/${id}`, {
    headers: authHeader(),
  });
  return response.data;
};

// Get all products for admin (authenticated)
export const getAdminProducts = async () => {
  const res = await axios.get(`${BASE_URL}/products/admin`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

// Update a product by ID
export const updateProduct = async (id, updatedProduct) => {
  const response = await axios.put(
    `${BASE_URL}/products/${id}`,
    updatedProduct,
    {
      headers: {
        ...authHeader(),
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Upload product image
export const uploadProductImage = async (id, formData) => {
  const response = await axios.post(
    `${BASE_URL}/products/${id}/upload`,
    formData,
    {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
