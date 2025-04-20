"use client";
import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductRegistration from '../components/ProductRegistration'; // ⬅️ Adjust the path if needed
import WalletConnect from '../components/WalletConnect';

const ManufacturerPage = () => {
  const [provider, setProvider] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-black">
      <Navbar setProvider={setProvider} />

      <main className="px-4 py-10">
        <h1 className="text-4xl text-white font-bold text-center mb-6">📦 Add a New Product</h1>
        {provider ? (
          <ProductRegistration provider={provider} />
        ) : (
          <div className="flex flex-col items-center justify-center mt-10">
            <p className="mb-4 text-lg">Please connect your wallet to start registering products.</p>
            <WalletConnect setProvider={setProvider} />
          </div>
        )}
      </main>
    </div>
  );
};

export default ManufacturerPage;
