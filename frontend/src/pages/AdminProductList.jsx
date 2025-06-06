import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAdminProducts, deleteProduct } from "../services/productService";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAdminProducts(); // ✅ CALL CORRECT ROUTE
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      setDeletingId(productId);
      await deleteProduct(productId);
      setProducts(products.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Delete failed:", err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, color: "white" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
        Admin Product List
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Brand</TableCell>
              <TableCell sx={{ color: "white" }}>Category</TableCell>
              <TableCell sx={{ color: "white" }}>Price</TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell sx={{ color: "white" }}>{product.name}</TableCell>
                <TableCell sx={{ color: "white" }}>{product.brand}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {product.category}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  ₹{product.variants?.[0]?.price ?? "N/A"}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(product._id)}
                    disabled={deletingId === product._id}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default AdminProductList;
