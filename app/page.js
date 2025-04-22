"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import { Database } from "@tableland/sdk";
import Navbar from "./components/Navbar";

export default function Home() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isInTableland, setIsInTableland] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  // 🔁 Auto-connect if wallet already authorized
  useEffect(() => {
    const autoConnect = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          const userAccount = accounts[0];
          const browserProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(browserProvider);
          setAccount(userAccount);
          await checkUserInTableland(userAccount);
        } else {
          setIsChecking(false); // Done checking
        }
      }
    };
    autoConnect();
  }, []);

  const connectWallet = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (accounts.length > 0) {
          const userAccount = accounts[0];
          const browserProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(browserProvider);
          setAccount(userAccount);
          await checkUserInTableland(userAccount);
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
    const tableName = "Table_1_60"; // Replace with your actual table name

    try {
      const stmt = await db.prepare(`SELECT role FROM ${tableName} WHERE wallet = ?`);
      const { results } = await stmt.bind(wallet).all();

      if (results.length > 0) {
        setIsInTableland(true);
      } else {
        router.push("/manufacturer");
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

        {isChecking && (
          <button className="px-8 py-4 bg-gray-600 text-lg font-semibold rounded-xl cursor-not-allowed">
            Checking...
          </button>
        )}

        {!isChecking && !account && (
          <button
            onClick={connectWallet}
            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-lg font-semibold rounded-xl"
          >
            Connect Wallet
          </button>
        )}

        {!isChecking && account && isInTableland && (
          <div className="flex flex-col gap-4 mt-6">
            <button
              onClick={() => router.push("/product")}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-lg font-semibold"
            >
              Product
            </button>
            <button
              onClick={() => router.push("/manufacturer")}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl text-lg font-semibold"
            >
              Manufacturer
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
