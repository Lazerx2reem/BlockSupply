import { useState } from 'react';
import { registerProduct } from '../utils/contract';

const ProductRegistration = ({ provider }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [barcode, setBarcode] = useState('');

  const handleRegisterProduct = async () => {
    await registerProduct(name, description, barcode, provider);
  };

  return (
    <div>
      <h2>Register Product</h2>
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
