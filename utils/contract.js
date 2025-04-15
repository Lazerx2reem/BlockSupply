import { ethers } from "ethers";
import ProductRegistryABI from "./ProductRegistryABI.json";

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

export function getContract(signerOrProvider) {
  return new ethers.Contract(CONTRACT_ADDRESS, ProductRegistryABI, signerOrProvider);
}
