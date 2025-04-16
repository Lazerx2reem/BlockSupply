import Link from "next/link";
import WalletConnect from "./WalletConnect";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md py-3 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo + Nav Links */}
        <div className="flex items-center space-x-10">
          <Link href="/" className="text-2xl font-extrabold text-blue-600 hover:text-blue-800 transition-colors">
            Blocksupply
          </Link>
          <ul className="flex space-x-6 text-gray-700 text-sm font-medium">
            <li>
              <Link href="/verify" className="hover:text-blue-600 transition">Verify</Link>
            </li>
            <li>
              <Link href="/manufacturer" className="hover:text-blue-600 transition">Manufacturer</Link>
            </li>
            <li>
              <Link href="/reviews" className="hover:text-blue-600 transition">Reviews</Link>
            </li>
            <li>
              <Link href="/supplychain" className="hover:text-blue-600 transition">Supply Chain</Link>
            </li>
          </ul>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <Link href="/auth/login" className="text-sm text-gray-600 hover:text-black transition">
            Login
          </Link>
          <Link href="/auth/signup" className="text-sm text-gray-600 hover:text-black transition">
            Sign Up
          </Link>
          <WalletConnect onWalletConnected={(account) => console.log("Wallet connected:", account)} />
        </div>
      </div>
    </nav>
  );
}
