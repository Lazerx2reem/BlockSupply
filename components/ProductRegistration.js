import { useState } from 'react';
import QRCodeScanner from './QRScanner'; // Import QRCodeScanner
import { registerProduct } from '../utils/contract';

const ProductRegistration = ({ provider }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [barcode, setBarcode] = useState('');
  const [scannedData, setScannedData] = useState('');

  const handleRegisterProduct = async () => {
    // If scannedData exists, use it for registration
    const productData = scannedData ? { barcode: scannedData } : { name, description, barcode };
    
    await registerProduct(productData.name || name, productData.description || description, productData.barcode, provider);
  };

  const handleScan = (decodedText) => {
    setScannedData(decodedText); // Set the scanned QR code data to be used for registration
  };

  return (
    <div>
      <h2>Register Product</h2>
      <QRCodeScanner onScan={handleScan} /> {/* Render the QRCodeScanner */}
      
      {/* If no QR code is scanned, allow manual input */}
      {!scannedData && (
        <>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </>
      )}

      <input
        type="text"
        placeholder="Product Barcode"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />
      
      <button onClick={handleRegisterProduct}>Register</button>
    </div>
  );
};

export default ProductRegistration;
