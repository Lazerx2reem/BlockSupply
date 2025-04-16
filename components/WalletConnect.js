// components/WalletConnect.js
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletConnect = () => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);

  // Check if MetaMask is installed
  const checkMetaMask = () => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed');
      return true;
    }
    return false;
  };

  const connectWallet = async () => {
    if (checkMetaMask()) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const userAccount = accounts[0];
        setAccount(userAccount);
        const tempProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(tempProvider);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('MetaMask is not installed!');
    }
  };

  useEffect(() => {
    if (checkMetaMask()) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  return (
    <div>
      {account ? (
        <div>
          <p>Connected Account: {account}</p>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
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