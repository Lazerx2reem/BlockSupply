"use client";

import { useState } from 'react';
import QRCodeScanner from '../components/QRScanner';
import { getProductDetails } from '../../utils/contract'; // Ensure this function exists and fetches product by barcode
import Navbar from '../components/Navbar';

const ProductPage = () => {
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async (decodedText) => {
    setScannedBarcode(decodedText);
    setLoading(true);

    try {
      const product = await getProductDetails(decodedText); // Assumes barcode is the unique key
      if (product) {
        setProductInfo(product);
      } else {
        alert('❌ Product not found!');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">
      <Navbar />

      <main className="px-4 py-10 max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">🔍 Verify Product</h1>

        <QRCodeScanner onScan={handleScan} />

        {loading && (
          <p className="mt-6 text-center text-gray-300 animate-pulse">Fetching product details...</p>
        )}

        {productInfo && (
          <div className="mt-10 bg-white text-black p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-2">📦 {productInfo.name}</h2>
            <p className="text-gray-700 mb-1"><strong>Description:</strong> {productInfo.description}</p>
            <p className="text-gray-700"><strong>Barcode:</strong> {scannedBarcode}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductPage;
