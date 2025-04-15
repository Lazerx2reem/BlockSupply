import Link from "next/link";
import WalletConnect from "./WalletConnect";

export default function Navbar() {
  return (
    <nav className="navbar px-4 py-2 flex justify-between items-center bg-white shadow-md">
      <ul className="flex items-center space-x-6">
        <li className="text-xl font-bold text-blue-600">
          <Link href="/">Blocksupply</Link>
        </li>
        <li>
          <Link href="/verify">Verify</Link>
        </li>
        <li>
          <Link href="/manufacturer">Manufacturer</Link>
        </li>
        <li>
          <Link href="/reviews">Reviews</Link>
        </li>
        <li>
          <Link href="/supplychain">Supply Chain</Link>
        </li>
      </ul>

      <div className="flex items-center space-x-4">
        <Link href="/auth/login" className="text-sm text-gray-700 hover:text-black">
          Login
        </Link>
        <Link href="/auth/signup" className="text-sm text-gray-700 hover:text-black">
          Sign Up
        </Link>
        <WalletConnect onWalletConnected={(account) => console.log("Wallet connected:", account)} />
      </div>
    </nav>
  );
}
