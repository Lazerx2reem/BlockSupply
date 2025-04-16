import WalletConnect from '../components/WalletConnect';
import Navbar from "../components/Navbar"

const Home = () => {
  return (
    <div>
        <Navbar />
      <h1>Welcome to Blocksupply</h1>
      <WalletConnect />
    </div>
  );
};

export default Home;
