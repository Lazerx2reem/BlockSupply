"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import Navbar from "./components/Navbar";

export default function Home() {
  const router = useRouter();
  const connectWithMetamask = useMetamask();
  const address = useAddress(); // Connected wallet address
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (address) {
      handleUserRouting(address);
    }
  }, [address]);

  const handleUserRouting = async (wallet) => {
    setIsChecking(true);

    // Mock example: get role from localStorage or assign default
    let role = localStorage.getItem("role");

    if (!role) {
      // Fallback: ask the user to pick a role if not stored
      alert("No role found. Redirecting to role selection...");
      router.push("/register");
    } else {
      // Save wallet
      localStorage.setItem("wallet", wallet);

      setTimeout(() => {
        if (role === "customer") {
          router.push("/product");
        } else if (role === "manufacturer") {
          router.push("/manufacturer");
        } else {
          alert("Unknown role found.");
        }
      }, 1000);
    }

    setIsChecking(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex flex-col flex-grow items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Welcome to BlockSupply
        </h1>
        <p className="text-gray-400 mb-6 text-lg max-w-md">
          Secure and transparent supply chain tracking using the power of blockchain.
        </p>

        {isChecking ? (
          <button className="px-8 py-4 bg-gray-600 text-lg font-semibold rounded-xl cursor-not-allowed">
            Checking...
          </button>
        ) : (
          <button
            onClick={connectWithMetamask}
            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-lg font-semibold rounded-xl"
          >
            Connect Wallet
          </button>
        )}
      </main>
    </div>
  );
}
