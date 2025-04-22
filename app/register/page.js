"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { connectMetaMask } from "../components/WalletConnect";
import { Database } from "@tableland/sdk";
import { ethers } from "ethers";

export default function RegisterPage() {
  const [wallet, setWallet] = useState(null);
  const [provider, setProvider] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const autoConnect = async () => {
      try {
        const acc = await connectMetaMask(setProvider);
        setWallet(acc);
      } catch (err) {
        console.error("MetaMask auto-connect failed:", err);
      }
    };
    autoConnect();
  }, []);

  const handleRegister = async (role) => {
    try {
      if (!wallet || !provider) {
        alert("Connect your wallet first.");
        return;
      }

      const signer = provider.getSigner(wallet);
      const db = new Database({ signer });
      const tableName = "Table_1_60";

      const readRes = await db.prepare(`SELECT * FROM ${tableName} WHERE wallet = ?`)
        .bind(wallet)
        .all();

      if (readRes.results.length > 0) {
        alert("Wallet already registered!");
        return;
      }

      await db.prepare(
        `INSERT INTO ${tableName} (wallet, role, status) VALUES (?, ?, ?)`
      ).bind(wallet, role, "active").run();

      router.push(`/${role}`);
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed! See console for more info.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
        Choose Your Role
      </h1>

      <p className="mb-8 text-lg text-gray-300 text-center">
        Connected wallet:{" "}
        <span className="text-green-400 font-medium">
          {wallet ? wallet : "Not connected"}
        </span>
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        <button
          onClick={() => handleRegister("customer")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg transition"
        >
          I'm a Customer
        </button>
        <button
          onClick={() => handleRegister("manufacturer")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg transition"
        >
          I'm a Manufacturer
        </button>
      </div>
    </main>
  );
}
