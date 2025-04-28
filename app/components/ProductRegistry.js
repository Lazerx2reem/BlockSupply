'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { db } from '../../firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import QRCodeScanner from './QRScanner';
import abi from '../../abi/ProductRegistry.json';

const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS_HERE';

export default function ProductRegistration({ provider }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    barcode: '',
    manufacturingDate: '',
    expirationDate: '',
  });
  const [scannedBarcode, setScannedBarcode] = useState('');
  const router = useRouter();

  const handleScan = (decodedText) => {
    setScannedBarcode(decodedText);
    setForm((prev) => ({ ...prev, barcode: decodedText }));
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

    try {
      // Step 1: Upload to Firebase
      const docRef = await addDoc(collection(db, 'products'), {
        name,
        description,
        barcode,
        manufacturingDate,
        expirationDate,
        createdAt: new Date(),
      });

      const firestoreUrl = `https://console.firebase.google.com/u/0/project/blocksupply-259b1/firestore/data/~2Fproducts~2F${docRef.id}`;

      // Step 2: Upload Firestore URL to Smart Contract
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      const tx = await contract.registerProduct(firestoreUrl);
      await tx.wait();

      alert('✅ Product registered successfully on blockchain and Firestore!');
      
      // Clear form
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
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register Product</h2>

      <div className="mb-6">
        <QRCodeScanner onScan={handleScan} />
      </div>

      {Object.entries(form).map(([key, value]) => (
        <div key={key} className="mb-4">
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder={key === 'expirationDate' ? 'Optional' : `Enter ${key}`}
          />
        </div>
      ))}

      <button
        type="button" // 🔥 FIXED: add type="button" here
        onClick={handleSubmit}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-md mt-6"
      >
        ✅ Register Product
      </button>
    </div>
  );
}
