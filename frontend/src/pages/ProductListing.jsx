// // src/pages/ProductListing.jsx
// import React, { useEffect, useState } from "react";
// import { getAllProducts } from "../services/productService";
// import ProductCard from "../components/ProductCard";

// const ProductListing = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await getAllProducts();
//         console.log("Fetched products:", data); // 🔍 LOG
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <h1>All Smartphones</h1>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
//         {products.map((product) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductListing;
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching products from API...");
        const data = await getAllProducts();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>All Smartphones</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductListing;
