"use client";

import Link from 'next/link';
import WalletConnect from './WalletConnect';

const Navbar = ({ setProvider }) => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 shadow-md">
      <div className="text-2xl font-bold text-white">BlockSupply</div>
      <div className="flex items-center space-x-6">
        <Link href="/product">
          <span className="hover:text-green-400 transition duration-200">Product</span>
        </Link>
        <Link href="/registry">
          <span className="hover:text-green-400 transition duration-200">Registry</span>
        </Link>
        <WalletConnect setProvider={setProvider} />
      </div>
    </nav>
  );
};

export default Navbar;
