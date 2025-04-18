"use client";

import Link from 'next/link';
import { useState } from 'react'; // Import useState for setting provider
import WalletConnect from './WalletConnect';

const Navbar = () => {
  const [provider, setProvider] = useState(null); // Define state for provider

  return (
    <nav className="bg-gray-950 text-white px-6 py-4 shadow-md flex justify-between items-center">
      {/* Left-aligned BlockSupply logo */}
      <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
        BlockSupply
      </Link>

      {/* Right-aligned links and wallet connection */}
      <div className="flex items-center space-x-6">
        <Link href="/product" className="hover:text-green-400 transition">
          Product
        </Link>
        <Link href="/manufacturer" className="hover:text-green-400 transition">
          Manufacturer
        </Link>
        <WalletConnect setProvider={setProvider} /> {/* Pass setProvider as a prop */}
      </div>
    </nav>
  );
};

export default Navbar;
