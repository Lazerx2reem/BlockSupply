"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import { Database } from "@tableland/sdk";
import Navbar from "./components/Navbar";

export default function Home() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const router = useRouter();

  const connectWallet = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (accounts.length > 0) {
          const userAccount = accounts[0];
          const browserProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(browserProvider);
          setAccount(userAccount);
          checkUserInTableland(userAccount);
        }
      } else {
        alert("Please install MetaMask!");
      }
    } catch (err) {
      console.error("Error connecting wallet:", err);
    }
  };

  const checkUserInTableland = async (wallet) => {
    setIsChecking(true);
    const db = new Database();
    const tableName = "Table_1_60"; // Replace with your actual Tableland table

    try {
      const stmt = await db.prepare(`SELECT role FROM ${tableName} WHERE wallet = ?`);
      const { results } = await stmt.bind(wallet).all();

      if (results.length > 0) {
        const role = results[0].role;
        router.push(`/${role}`); // Redirect to /customer or /manufacturer
      } else {
        router.push("/register"); // Ask user to pick a role
      }
    } catch (err) {
      console.error("Error querying Tableland:", err);
    } finally {
      setIsChecking(false);
    }
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
        <button
          onClick={connectWallet}
          className={`px-8 py-4 text-lg font-semibold rounded-xl transition duration-300 
            ${isChecking ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}
          `}
          disabled={isChecking}
        >
          {isChecking ? "Checking..." : "Connect Wallet"}
        </button>
      </main>
    </div>
  );
}
