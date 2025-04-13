import { ethers } from "ethers";

export const connectWallet = async () => {
  if (!window.ethereum) return alert("Please install MetaMask");
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  return accounts[0];
};
