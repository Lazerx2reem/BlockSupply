import { ethers } from 'ethers';

const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = [
  // ABI of the ProductRegistration contract
  {
    "inputs": [],
    "name": "productCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getProduct",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "barcode",
            "type": "string"
          }
        ],
        "internalType": "struct ProductRegistration.Product",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
  // Add other functions from your contract ABI
];

export const getContract = (provider) => {
  return new ethers.Contract(contractAddress, contractABI, provider);
};

export const registerProduct = async (name, description, barcode, provider) => {
  const signer = provider.getSigner();
  const contract = getContract(provider);
  const tx = await contract.connect(signer).registerProduct(name, description, barcode);
  await tx.wait();
  console.log('Product Registered');
};
