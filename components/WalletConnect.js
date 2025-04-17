// components/WalletConnect.js
"use client";

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletConnect = ({ setProvider }) => {
  const [account, setAccount] = useState(null);

  const checkMetaMask = () => typeof window.ethereum !== 'undefined';

  const connectWallet = async () => {
    if (checkMetaMask()) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        const tempProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(tempProvider);
      } catch (error) {
        console.error('MetaMask connection error:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  useEffect(() => {
    if (checkMetaMask()) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  return account ? (
    <span className="text-green-400 text-sm truncate max-w-xs">{account}</span>
  ) : (
    <button
      onClick={connectWallet}
      className="bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-xl transition duration-200"
    >
      Connect Wallet
    </button>
  );
};

export default WalletConnect;


/*
// /app/lib/walletConnect.js

export async function connectMetaMask() {
  if (typeof window !== 'undefined' && window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  } else {
    throw new Error('MetaMask is not installed');
  }
}
  */