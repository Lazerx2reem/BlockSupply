import { useState } from 'react';
import QRCodeScanner from './QRScanner';
import { registerProduct } from '../../utils/contract';

const ProductRegistration = ({ provider }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [barcode, setBarcode] = useState('');
  const [scannedBarcode, setScannedBarcode] = useState('');

  const handleScan = (decodedText) => {
    setScannedBarcode(decodedText);
    setBarcode(decodedText);
  };

  const handleRegisterProduct = async () => {
    if (!name || !description || !(scannedBarcode || barcode)) {
      alert('Please fill in all required fields or scan a barcode.');
      return;
    }

    try {
      const productName = name.trim();
      const productDescription = description.trim();
      const productBarcode = scannedBarcode || barcode.trim();

      await registerProduct(productName, productDescription, productBarcode, provider);
      alert('Product registered successfully!');

      // Reset fields
      setName('');
      setDescription('');
      setBarcode('');
      setScannedBarcode('');
    } catch (error) {
      console.error('Error registering product:', error);
      alert('Failed to register product.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Register Product</h2>

      <QRCodeScanner onScan={handleScan} />

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="Product Barcode"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <button
        onClick={handleRegisterProduct}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
      >
        Register
      </button>
    </div>
  );
};

export default ProductRegistration;
