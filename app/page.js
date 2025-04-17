"use client";

import { useState } from 'react';
import ProductVerification from '../components/ProductVerification';
import Navbar from '../components/Navbar';

const Home = () => {
  const [provider, setProvider] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar setProvider={setProvider} />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center py-20 px-6">
        <h1 className="text-4xl font-semibold mb-8 text-center">
          Verify Products on the Blockchain
        </h1>

        {!provider ? (
          <p className="text-lg text-gray-400">Please connect your wallet to begin.</p>
        ) : (
          <div className="w-full max-w-4xl">
            <ProductVerification provider={provider} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
