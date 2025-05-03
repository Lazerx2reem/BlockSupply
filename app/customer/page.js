'use client';

import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from "../components/Customer"

const QRScanner = dynamic(() => import('../components/QRScanner'), { ssr: false });

export default function CustomerPage() {
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!barcode) return alert('Please enter or scan a barcode.');

    setLoading(true);
    setProduct(null);

    try {
      const snapshot = await getDocs(collection(db, 'products'));
      const productsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const found = productsList.find(p => p.barcode === barcode);
      setProduct(found || null);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  const handleScan = (scannedBarcode) => {
    if (scannedBarcode) {
      setBarcode(scannedBarcode);
      setScanning(false);
      handleSearch();
    }
  };

  return (
    <div><Navbar />
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-950 to-black py-10 px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-6 items-center">
        <h1 className="text-4xl font-extrabold text-white mb-6 text-center">Search Product</h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <input
            type="text"
            placeholder="Enter Barcode..."
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="flex-1 p-4 rounded-xl border border-purple-600 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSearch}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            Search
          </button>
        </div>

        <button
          onClick={() => setScanning(true)}
          className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-5 rounded-full transition duration-300"
        >
          📷 Scan QR Code
        </button>

        {scanning && (
          <div className="mt-6 w-full flex flex-col items-center">
            <QRScanner onScan={handleScan} onClose={() => setScanning(false)} />
          </div>
        )}

        {loading && (
          <p className="text-gray-300 mt-6">Loading...</p>
        )}

        {product && (
          <div className="bg-white/10 backdrop-blur-sm border border-purple-700 rounded-2xl p-8 mt-8 shadow-md hover:shadow-xl transition-transform hover:-translate-y-2 duration-300 w-full">
            <h2 className="text-2xl font-bold text-white mb-4">{product.name}</h2>
            <div className="space-y-3 text-gray-300 text-sm">
              <p><span className="font-semibold text-purple-400">Barcode:</span> {product.barcode}</p>
              <p><span className="font-semibold text-purple-400">Description:</span> {product.description}</p>
              <p><span className="font-semibold text-purple-400">Manufacturing Date:</span> {product.manufacturingDate}</p>
              <p><span className="font-semibold text-purple-400">Expiration Date:</span> {product.expirationDate || 'N/A'}</p>
              <p><span className="font-semibold text-purple-400">Product ID:</span> {product.id}</p>
            </div>
          </div>
        )}

        {!loading && product === null && barcode && (
          <p className="text-center text-red-400 mt-6">No product found with this barcode.</p>
        )}
      </div>
    </div>
    </div>
  );
}
