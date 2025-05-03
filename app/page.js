'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import abi from './abi/UserDB.json';

const USERDB_CONTRACT_ADDRESS = '0x04171daf5f95b3e07fd37b72e759bbd22e5636c9';

export default function Home() {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);

  async function handleConnect() {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is not installed!');
      return;
    }

    try {
      setIsConnecting(true);
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const contract = new ethers.Contract(USERDB_CONTRACT_ADDRESS, abi, signer);

      const user = await contract.getUser(address);

      if (user.wallet.toLowerCase() === ethers.constants.AddressZero.toLowerCase()) {
        router.push('/register');
      } else {
        router.push(user.role === 0 ? '/customer' : '/manufacturer');
      }
    } catch (err) {
      console.error('Error connecting to blockchain:', err);
      alert('Connection failed. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-dvh bg-gradient-to-br from-[#0b0217] via-[#150533] to-[#1c052d] text-white px-6 relative overflow-hidden">
      
      {/* Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#3b0a5c33] to-transparent opacity-30 animate-pulse pointer-events-none"></div>

      {/* Top Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#6d28d9] rounded-full opacity-10 blur-3xl pointer-events-none"></div>

      {/* Bottom Glow */}
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#9333ea] rounded-full opacity-10 blur-3xl pointer-events-none"></div>

      <h1 className="text-6xl sm:text-7xl font-extrabold mb-6 text-center tracking-tight drop-shadow-lg z-10">
        Block<span className="text-[#a855f7]">Supply</span>
      </h1>

      <p className="text-lg sm:text-xl mb-10 max-w-2xl text-center text-[#d1c4e9] leading-relaxed z-10">
      Verify authenticity. Track origins. Empower trust - <br />  one block at a time.
      </p>

      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className={`z-10 ${
          isConnecting
            ? 'bg-[#6b21a8] cursor-not-allowed'
            : 'bg-gradient-to-r from-[#9333ea] to-[#7e22ce] hover:from-[#a855f7] hover:to-[#6b21a8]'
        } text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300`}
      >
        {isConnecting ? '🔄 Connecting...' : '🚀 Connect Wallet'}
      </button>

      {/* Subtle Footer Glow */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#1c052d] to-transparent pointer-events-none"></div>
    </div>
  );
}
