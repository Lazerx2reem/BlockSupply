import { useState } from 'react';
import { ethers } from 'ethers';
import { getContract } from '../utils/contract';

const ProductVerification = ({ provider }) => {
  const [productId, setProductId] = useState('');
  const [productDetails, setProductDetails] = useState(null);

  const handleVerifyProduct = async () => {
    const contract = getContract(provider);
    const product = await contract.getProduct(productId);
    setProductDetails(product);
  };

  return (
    <div>
      <h2>Verify Product</h2>
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button onClick={handleVerifyProduct}>Verify</button>
      
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
