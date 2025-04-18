"use client";

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletConnect = ({ setProvider }) => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          const tempProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(tempProvider);
        }
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error('MetaMask connection error:', error);
    }
  };

  // ✅ Put this updated useEffect here:
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

      // Try to auto-connect if already connected
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          const tempProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(tempProvider);
        }
      });
    }

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []); // ⬅️ Don't put setProvider here

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
