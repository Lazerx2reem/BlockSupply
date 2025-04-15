import { ethers } from 'ethers';

const CONTRACT_ADDRESS = "0xYourDeployedContractAddressHere";
const ABI = [
  // your contract ABI here
];

export async function getContract() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  } else {
    alert("MetaMask is not installed");
  }
}
