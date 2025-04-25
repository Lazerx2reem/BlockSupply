"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContract, useAddress, useMetamask } from "@thirdweb-dev/react";

export default function RegisterPage() {
  const router = useRouter();
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const { contract } = useContract("YOUR_CONTRACT_ADDRESS"); // Replace this with your actual contract address

  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    console.log("Wallet address:", address);
  }, [address]);

  const handleRegister = async (role) => {
    if (!address || !contract) {
      alert("Connect your wallet first.");
      return;
    }

    try {
      setIsRegistering(true);

      // Check if the user is already registered
      const existing = await contract.call("getRole", [address]);
      if (existing && existing !== "") {
        alert(`Wallet already registered as ${existing}`);
        return;
      }

      // Register using msg.sender, not passing the address explicitly
      await contract.call("register", [role]);

      router.push(`/${role}`);
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed! Check console for details.");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
        Choose Your Role
      </h1>

      {address ? (
        <p className="mb-8 text-lg text-gray-300 text-center">
          Connected wallet:{" "}
          <span className="text-green-400 font-medium">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </p>
      ) : (
        <button
          onClick={connectWithMetamask}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg mb-6"
        >
          Connect Wallet
        </button>
      )}

      {address && contract && (
        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => handleRegister("customer")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg transition"
            disabled={isRegistering}
          >
            I'm a Customer
          </button>
          <button
            onClick={() => handleRegister("manufacturer")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg transition"
            disabled={isRegistering}
          >
            I'm a Manufacturer
          </button>
        </div>
      )}
    </main>
  );
}
