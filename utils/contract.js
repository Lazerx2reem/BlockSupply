import { ethers } from 'ethers';

// Example smart contract address and ABI
const CONTRACT_ADDRESS = 'your_contract_address_here';
const ABI = [
  // Your contract ABI here
  {
    "constant": true,
    "inputs": [
      { "name": "productId", "type": "string" }
    ],
    "name": "getProduct",
    "outputs": [
      { "name": "", "type": "string" },
      { "name": "", "type": "string" },
      { "name": "", "type": "string" }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

// Initialize contract
export const getContract = (provider) => {
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
};
