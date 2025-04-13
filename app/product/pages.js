"use client";
import React, { useState } from "react";
import { getContract } from "@/utils/blockchain";

export default function ProductPage() {
  const [id, setId] = useState("");
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    const contract = await getContract();
    const data = await contract.getProduct(id);
    setProduct(data);
  };

  return (
    <div className="p-4">
      <h1>Verify Product</h1>
      <input placeholder="Enter Product ID" onChange={(e) => setId(e.target.value)} />
      <button onClick={fetchProduct}>Verify</button>
      {product && (
        <div className="mt-4">
          <p>Name: {product.name}</p>
          <p>Description: {product.description}</p>
          <p>Manufacturer: {product.manufacturer}</p>
          <p>Timestamp: {new Date(product.timestamp * 1000).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
