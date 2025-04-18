"use client";

import Link from 'next/link';
import WalletConnect from './WalletConnect';

const Navbar = ({ setProvider }) => {
  return (
    <nav className="bg-gray-950 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
        BlockSupply
      </div>

      <div className="flex items-center space-x-6">
        <Link href="/product" className="hover:text-green-400 transition">
          Product
        </Link>
        <Link href="/registry" className="hover:text-green-400 transition">
          Registry
        </Link>
        <WalletConnect setProvider={setProvider} />
      </div>
    </nav>
  );
};

export default Navbar;
