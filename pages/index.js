import { useEffect, useState } from 'react';
import ProductVerification from '../components/ProductVerification';
import { BrowserProvider } from 'ethers';

const Home = () => {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      const { ethereum } = window;

      if (ethereum) {
        try {
          // Request access to MetaMask
          await ethereum.request({ method: 'eth_requestAccounts' });

          // Create provider using Ethers v6
          const ethProvider = new BrowserProvider(ethereum);

          // Set the provider in state
          setProvider(ethProvider);
        } catch (error) {
          console.error("User denied account access:", error);
        }
      } else {
        console.log('Ethereum object not found. Please install MetaMask!');
      }
    };

    initProvider();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Product Verification</h1>
      {provider ? (
        <ProductVerification provider={provider} />
      ) : (
        <p>Please connect to MetaMask.</p>
      )}
    </div>
  );
};

export default Home;
