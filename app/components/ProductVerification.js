
import { useState } from 'react';
import QRCodeScanner from '../components/QRScanner';
import { getContract } from '../../utils/contract';

const ProductVerification = ({ provider }) => {
  const [productId, setProductId] = useState('');
  const [productDetails, setProductDetails] = useState(null);

  const handleVerifyProduct = async (id) => {
    const contract = getContract(provider);
    const product = await contract.getProduct(id);
    setProductDetails(product);
  };

  const handleScan = (scannedId) => {
    setProductId(scannedId);
    handleVerifyProduct(scannedId);
  };

  return (
    <div>
      <h2>Verify Product</h2>

      <QRCodeScanner onScan={handleScan} />

      <p>Product ID: {productId}</p>
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

