import React from "react";

const ProductDetails = ({ product }) => {
  return (
    <div>
      <h2>{product.name}</h2>
      <div className="product-images">
        {product.imageUrls.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`${product.name} image ${idx + 1}`}
            style={{ width: "200px", margin: "10px" }}
          />
        ))}
      </div>
      <p>
        <strong>Display:</strong> {product.display}
      </p>
      <p>
        <strong>Processor:</strong> {product.processor}
      </p>
      {/* ... other fields ... */}
    </div>
  );
};

export default ProductDetails;
