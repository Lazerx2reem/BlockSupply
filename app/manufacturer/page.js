'use client';

import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import Navbar from "../components/Manufacturer"

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentWallet, setCurrentWallet] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function connectWalletAndFetch() {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.send('eth_requestAccounts', []);
          const walletId = accounts[0];
          setCurrentWallet(walletId);

          const snapshot = await getDocs(collection(db, 'products'));
          const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

          const filteredProducts = list.filter((product) => 
            product.walletId && product.walletId.toLowerCase() === walletId.toLowerCase()
          );

          setProducts(filteredProducts);
        } catch (error) {
          console.error('Failed to connect wallet or fetch products', error);
        } finally {
          setLoading(false);
        }
      } else {
        alert('Please install MetaMask!');
        setLoading(false);
      }
    }

    connectWalletAndFetch();
  }, []);

  return (
    <div><Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-950 to-black py-10 px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto mb-10">
        <h2 className="text-4xl font-extrabold text-white text-center sm:text-left mb-6 sm:mb-0">
          My Products
        </h2>
        <button
          onClick={() => router.push('/manufacturer/profile')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300"
        >
          ➕ Add Product
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-300">Loading your products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-400">No products found for your wallet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-white/10 backdrop-blur-sm border border-purple-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition-transform hover:-translate-y-2 duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{product.name}</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <p><span className="font-semibold text-purple-400">Barcode:</span> {product.barcode}</p>
                <p><span className="font-semibold text-purple-400">Description:</span> {product.description}</p>
                <p><span className="font-semibold text-purple-400">Manufacturing Date:</span> {product.manufacturingDate}</p>
                <p><span className="font-semibold text-purple-400">Expiration Date:</span> {product.expirationDate || 'N/A'}</p>
                <p><span className="font-semibold text-purple-400">Product ID:</span> {product.id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
