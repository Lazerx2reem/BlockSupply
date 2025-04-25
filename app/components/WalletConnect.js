"use client";

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// ✅ Reusable function for connecting MetaMask externally
export const connectMetaMask = async (setProvider) => {
  try {
    if (typeof window !== 'undefined' && window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        const provider = new ethers.providers.Web3Provider(window.ethereum); // ethers v5
        setProvider(provider);
        return accounts[0];
      }
    } else {
      alert('Please install MetaMask!');
    }
  } catch (error) {
    console.error('MetaMask connection error:', error);
    throw error;
  }
};

// ✅ Component to show Connect button or wallet address
const WalletConnect = ({ setProvider }) => {
  const [account, setAccount] = useState(null);

  const handleConnect = async () => {
    try {
      const acc = await connectMetaMask(setProvider);
      if (acc) setAccount(acc);
    } catch (err) {
      console.error("Connection failed:", err);
    }
  };

  // Auto-connect if previously authorized
  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(null);
      }
    };

    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);

      // Check for existing connection
      window.ethereum.request({ method: 'eth_accounts' }).then(async (accounts) => {
        if (accounts.length > 0) {
          const provider = new ethers.providers.Web3Provider(window.ethereum); // ethers v5

          setProvider(provider);
          setAccount(accounts[0]);
        }
      });
    }

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, [setProvider]);

  return account ? (
    <span className="text-green-400 text-sm truncate max-w-xs">{account}</span>
  ) : (
    <button
      onClick={handleConnect}
      className="bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-xl transition duration-200"
    >
      Connect Wallet
    </button>
  );
};

export default WalletConnect;
