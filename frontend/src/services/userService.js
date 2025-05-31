import axios from "./api"; // adjust path if needed

export const sendNewsletterSignup = async ({ name, email }) => {
  const res = await axios.post("/newsletter/signup", { name, email });
  return res.data;
};
