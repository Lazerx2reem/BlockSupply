"use client";
import React, { useState } from "react";
import { getContract } from "@/utils/blockchain";

export default function ManufacturerPage() {
  const [form, setForm] = useState({ id: "", name: "", description: "", manufacturer: "" });

  const handleSubmit = async () => {
    const contract = await getContract();
    await contract.registerProduct(form.id, form.name, form.description, form.manufacturer);
    alert("Product registered on chain!");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Register Product</h1>
      <input placeholder="Product ID" onChange={(e) => setForm({ ...form, id: e.target.value })} />
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Manufacturer" onChange={(e) => setForm({ ...form, manufacturer: e.target.value })} />
      <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Register</button>
    </div>
  );
}
