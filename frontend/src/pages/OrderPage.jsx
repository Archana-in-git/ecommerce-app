import React from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

const OrderPage = () => {
  const { id } = useParams();
  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h5">Order Page for Product ID: {id}</Typography>
      {/* You can build order functionality here */}
    </div>
  );
};

export default OrderPage;
