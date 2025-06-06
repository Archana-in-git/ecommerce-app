import api from "./api"; // ✅ use configured axios instance

export const getAllOrdersForAdmin = async () => {
  const { data } = await api.get("/orders/admin");
  return data;
};
