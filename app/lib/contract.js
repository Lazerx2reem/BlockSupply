import { ethers } from 'ethers';
import contractABI from '../abi/UserDB.json';

const CONTRACT_ADDRESS = '0x1c31f74185d72e62587ab315e0a906fb8a24ffc8';

export const getContract = () => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error("MetaMask not detected");
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
};
