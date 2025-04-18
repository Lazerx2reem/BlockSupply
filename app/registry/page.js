// pages/register.js
'use client'
import ProductRegistration from '../components/ProductRegistration'; // Import ProductRegistration
import Navbar from '../components/Navbar';

const RegisterPage = ({ provider }) => {
  return (
    <div>
      <Navbar />
      <ProductRegistration provider={provider} /> {/* Pass provider to the ProductRegistration component */}
    </div>
  );
};

// This is a placeholder to simulate the provider being passed down to the page.
// In a real-world scenario, you would fetch the provider from the Ethereum wallet (like MetaMask).
RegisterPage.getInitialProps = async () => {
  // Replace with actual logic to get the provider from a web3 wallet or context.
  return {
    provider: {} // For now, just return an empty object as a placeholder.
  };
};

export default RegisterPage;
