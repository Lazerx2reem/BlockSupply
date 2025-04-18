"use client";

import { useState } from 'react';
import ProductVerification from './components/ProductVerification';
import Navbar from './components/Navbar';

const Home = () => {
  const [provider, setProvider] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">
      {/* Navbar */}
      <Navbar setProvider={setProvider} />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
          Verify Products on the Blockchain
        </h1>

        {!provider ? (
          <p className="text-lg text-gray-300 mt-4">
            Please connect your wallet to begin.
          </p>
        ) : (
          <div className="w-full max-w-4xl mt-8">
            <ProductVerification provider={provider} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
