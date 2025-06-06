import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getAllOrdersForAdmin = async () => {
  const { data } = await axios.get(`${BASE_URL}/orders`, { withCredentials: true });
  return data;
};
