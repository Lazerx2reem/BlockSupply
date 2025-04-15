import { useEffect, useState } from 'react';

export default function WalletConnect({ onWalletConnected }) {
  const [account, setAccount] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
        if (accounts.length) {
          setAccount(accounts[0]);
          onWalletConnected(accounts[0]);
        }
      });

      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || "");
        onWalletConnected(accounts[0] || "");
      });
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask");
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    onWalletConnected(accounts[0]);
  };

  return (
    <button onClick={connectWallet} className="connect-button">
      {account ? `Connected: ${account.slice(0, 6)}...` : 'Connect Wallet'}
    </button>
  );
}
