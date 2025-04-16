import { useState } from 'react';
import { ethers } from 'ethers';
import { getContract } from '../utils/contract';
import QrReader from 'react-qr-reader';

const ProductVerification = ({ provider }) => {
  const [productId, setProductId] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [scanning, setScanning] = useState(false);

  // Function to handle QR code scan result
  const handleScan = async (data) => {
    if (data) {
      setProductId(data); // Set the scanned product ID
      handleVerifyProduct(data); // Verify the product once QR is scanned
    }
  };

  // Function to handle errors during the scan
  const handleError = (err) => {
    console.error(err);
  };

  // Function to verify product from the blockchain
  const handleVerifyProduct = async (productId) => {
    const contract = getContract(provider);
    const product = await contract.getProduct(productId);
    setProductDetails(product);
  };

  return (
    <div>
      <h2>Verify Product</h2>
      {!scanning ? (
        <>
          <input
            type="text"
            placeholder="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <button onClick={() => handleVerifyProduct(productId)}>Verify</button>
          <button onClick={() => setScanning(true)}>Scan QR Code</button>
        </>
      ) : (
        <div>
          <button onClick={() => setScanning(false)}>Cancel Scan</button>
          <QrReader
            delay={300}
            style={{ width: '100%' }}
            onError={handleError}
            onScan={handleScan}
          />
        </div>
      )}

      {productDetails && (
        <div>
          <p>Name: {productDetails.name}</p>
          <p>Description: {productDetails.description}</p>
          <p>Barcode: {productDetails.barcode}</p>
        </div>
      )}
    </div>
  );
};

export default ProductVerification;
