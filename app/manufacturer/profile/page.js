'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import QRCodeScanner from '../../components/QRScanner';
import abi from '../../abi/CompanyProfileDB.json';

const MANUFACTURER_CONTRACT = '0xb82cc1e37f694efca0654580e42375f530f7d413';

export default function ProductRegistration() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    barcode: '',
    manufacturingDate: '',
    expirationDate: '',
  });
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const _provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(_provider);

      _provider.send('eth_requestAccounts', [])
        .then((accounts) => {
          setAccount(accounts[0]);
          setSigner(_provider.getSigner());
        })
        .catch((err) => {
          console.error('User rejected connection', err);
          alert('Please connect your MetaMask wallet.');
        });
    } else {
      console.error('MetaMask is not installed.');
      alert('Please install MetaMask to use this feature.');
    }
  }, []);

  const handleScan = (decodedText) => {
    if (decodedText) {
      setScannedBarcode(decodedText);
      setForm((prev) => ({ ...prev, barcode: decodedText }));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, description, barcode, manufacturingDate, expirationDate } = form;

    if (!name || !description || !barcode || !manufacturingDate) {
      alert('Please fill all required fields.');
      return;
    }

    if (!signer) {
      alert('Wallet not connected.');
      return;
    }

    try {
      // Step 1: Upload to Firebase
      const docRef = await addDoc(collection(db, 'products'), {
        name,
        description,
        barcode,
        manufacturingDate,
        expirationDate,
        createdAt: new Date(),
        walletId: account,
      });

      const firestoreUrl = `https://console.firebase.google.com/u/0/project/blocksupply-259b1/firestore/data/~2Fproducts~2F${docRef.id}`;

      // Step 2: Upload Firestore URL to Smart Contract
      const contract = new ethers.Contract(MANUFACTURER_CONTRACT, abi, signer);
      const tx = await contract.setProfileURL(firestoreUrl);
      await tx.wait();

      alert('✅ Product registered successfully on blockchain and Firestore!');

      setForm({
        name: '',
        description: '',
        barcode: '',
        manufacturingDate: '',
        expirationDate: '',
      });
      setScannedBarcode('');
    } catch (err) {
      console.error('Registration failed:', err);
      alert('❌ Failed to register product.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Register Product</h2>

      <div className="mb-6">
        <QRCodeScanner onScan={handleScan} />
      </div>

      <div className="space-y-4">
        {Object.entries(form).map(([key, value]) => (
          <div key={key}>
            <label className="block text-gray-700 font-semibold mb-1">
              {key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (s) => s.toUpperCase())}
              {key !== 'expirationDate' && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={key.includes('Date') ? 'date' : 'text'}
              name={key}
              value={value}
              onChange={handleChange}
              className=" w-full p-3 border border-gray-300 rounded-lg text-black shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder={key === 'expirationDate' ? 'Optional' : `Enter ${key}`}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition duration-300 shadow-lg"
      >
        ✅ Register Product
      </button>

      {account && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Connected as: {account}
        </p>
      )}
    </div>
  );
}
