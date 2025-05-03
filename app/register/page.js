'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import abi from '../abi/UserDB.json';

const REGISTER_CONTRACT = '0x04171daf5f95b3e07fd37b72e759bbd22e5636c9';

export default function RegisterPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  async function handleRegister(role) {
    if (!window.ethereum) return alert('MetaMask not found');

    setIsRegistering(true);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(REGISTER_CONTRACT, abi, signer);

      const tx = await contract.registerUser(role);
      await tx.wait();

      // After successful registration, route them correctly
      if (role === 0) {
        router.push('/customer');
      } else if (role === 1) {
        router.push('/manufacturer');
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err?.error?.message?.includes('User already registered')) {
        alert('You are already registered!');
        router.push('/');
      } else {
        alert('Transaction failed. Please try again.');
      }
    } finally {
      setIsRegistering(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 space-y-10">
      <h1 className="text-4xl font-bold text-gray-800">Register Your Role</h1>
      <p className="text-lg text-gray-600">Choose how you want to use the platform.</p>
      <div className="flex gap-10">
        <button
          onClick={() => handleRegister(0)}
          disabled={isRegistering}
          className={`px-6 py-3 rounded-lg shadow transition ${
            isRegistering ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          {isRegistering ? '🔄 Registering...' : 'Register as Customer'}
        </button>
        <button
          onClick={() => handleRegister(1)}
          disabled={isRegistering}
          className={`px-6 py-3 rounded-lg shadow transition ${
            isRegistering ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isRegistering ? '🔄 Registering...' : 'Register as Manufacturer'}
        </button>
      </div>
    </div>
  );
}  