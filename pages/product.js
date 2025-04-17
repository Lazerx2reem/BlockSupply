import { useEffect, useState } from 'react';
import ProductVerification from '../components/ProductVerification';
import { BrowserProvider } from 'ethers';

const Home = () => {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      const { ethereum } = window;

      if (ethereum) {
        try {
          await ethereum.request({ method: 'eth_requestAccounts' });
          const ethProvider = new BrowserProvider(ethereum);
          setProvider(ethProvider);
        } catch (error) {
          console.error("User denied account access:", error);
        }
      } else {
        console.log('Ethereum object not found. Please install MetaMask!');
      }
    };

    initProvider();
  }, []);

  return (
    <div className="bg-purple-100 min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-purple-700 mb-8 text-center">🔍 Product Verification</h1>

      {provider ? (
        <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6">
          <ProductVerification provider={provider} />
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-lg text-gray-700 mb-4">Please connect to MetaMask to continue.</p>
          <p className="text-sm text-gray-500 italic">Ensure you have the MetaMask extension installed.</p>
        </div>
      )}
    </div>
  );
};

export default Home;


/*// /app/page.js

'use client';

import { useRouter } from 'next/navigation';
import { connectMetaMask } from './components/WalletConnect';
import { getUserStatus } from './components/tableland_storage';

export default function Home() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const wallet = await connectMetaMask();
      router.push(`/register?wallet=${wallet}`);
    } catch (err) {
      console.error("MetaMask connection failed", err);
    }
  };

  const handleRegistered = async () => {
    try {
      const wallet = await connectMetaMask();
      const role = await getUserStatus(wallet);

      if (role === 'company') {
        router.push('/company');
      } else if (role === 'candidate') {
        router.push('/candidate');
      } else {
        alert('You are not registered yet.');
      }
    } catch (err) {
      console.error("Error checking user status:", err);
    }
  };

  return (
    <div>
      <h1>Welcome to the Product Verification</h1>
      <button onClick={handleLogin}>Login with MetaMask</button>
      <button onClick={handleRegistered}>I am registered</button>
    </div>
  );
} */