'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import abi from './abi/UserDB.json';

const CONTRACT_ADDRESS = '0x0cd180784d3b6e2369532246a45748bb1a493119';

export default function Home() {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);

  async function handleConnect() {
    if (!window.ethereum) {
      alert('MetaMask is not installed!');
      return;
    }

    setIsConnecting(true);

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      const isRegistered = await contract.isUserRegistered(address);
      console.log("Is user registered?", isRegistered);

      if (!isRegistered) {
        router.push('/register');
      } else {
        const user = await contract.getUser(address);
        console.log("Fetched registered user:", user);

        if (user.role === 0) {
          router.push('/customer');
        } else if (user.role === 1) {
          router.push('/manufacturer');
        } else {
          // Fallback just in case
          router.push('/register');
        }
      }

    } catch (err) {
      console.error('Error connecting wallet or fetching user:', err);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 text-white px-6 relative overflow-x-hidden overflow-y-auto">
      
      {/* Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-800 to-transparent opacity-20 animate-pulse pointer-events-none"></div>

      <h1 className="text-6xl sm:text-7xl font-extrabold mb-6 text-center tracking-tight drop-shadow-lg z-10">
        Hire<span className="text-purple-400">Net</span>
      </h1>

      <p className="text-lg sm:text-xl mb-10 max-w-2xl text-center text-gray-300 leading-relaxed z-10">
        Discover extraordinary talent. Empower visionary companies. <br /> Built on trust. Powered by decentralization.
      </p>

      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className={`z-10 ${isConnecting ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-600'} text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300`}
      >
        {isConnecting ? '🔄 Connecting...' : '🚀 Connect Wallet'}
      </button>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-purple-900 to-transparent pointer-events-none"></div>
    </div>
  );
}
