import { useState } from 'react';
import QRCodeScanner from './QRScanner';
import { registerProduct } from '../../utils/contract';

const ProductRegistration = ({ provider }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [barcode, setBarcode] = useState('');
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [manufacturingDate, setManufacturingDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleScan = (decodedText) => {
    setScannedBarcode(decodedText);
    setBarcode(decodedText); // Autofill barcode input field
  };

  const handleRegisterProduct = async () => {
    if (!name || !description || !(scannedBarcode || barcode) || !manufacturingDate) {
      alert('Please fill in all required fields (Name, Description, Barcode, Manufacturing Date).');
      return;
    }

    try {
      const productName = name.trim();
      const productDescription = description.trim();
      const productBarcode = scannedBarcode || barcode.trim();
      const mfgDate = manufacturingDate;
      const expDate = expirationDate || null; // Can be null if not provided

      await registerProduct(productName, productDescription, productBarcode, mfgDate, expDate, provider);
      alert('✅ Product registered successfully!');

      // Reset
      setName('');
      setDescription('');
      setBarcode('');
      setScannedBarcode('');
      setManufacturingDate('');
      setExpirationDate('');
    } catch (error) {
      console.error('Registration Error:', error);
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
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Product Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="Enter product description"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Product Barcode</label>
          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="Scan or enter barcode"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Manufacturing Date</label>
          <input
            type="date"
            value={manufacturingDate}
            onChange={(e) => setManufacturingDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Expiration Date <span className="text-sm text-gray-500">(optional)</span>
          </label>
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

      <button
        onClick={handleRegisterProduct}
        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition duration-300 shadow-lg"
      >
        ✅ Register Product
      </button>
    </div>
  );
};

export default ProductRegistration;
