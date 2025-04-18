'use client';

import { useRouter } from 'next/navigation';
import { connectMetaMask } from '../components/WalletConnect';
import { getUserStatus } from '../components/tableland';

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
}