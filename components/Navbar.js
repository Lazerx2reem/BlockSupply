import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Inline styles
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: '15px 30px',
    color: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const logoStyle = {
    fontSize: '24px',
    color: 'white',
    textDecoration: 'none',
  };

  const menuStyle = {
    display: 'flex',
    gap: '20px',
  };

  const menuItemStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  };

  const menuItemHoverStyle = {
    color: '#4CAF50',
  };

  const menuIconStyle = {
    display: 'none',
    cursor: 'pointer',
  };

  const barStyle = {
    width: '30px',
    height: '3px',
    backgroundColor: 'white',
    margin: '6px 0',
  };

  // Mobile menu styles
  const mobileMenuStyle = {
    position: 'absolute',
    top: '60px',
    left: '0',
    backgroundColor: '#333',
    width: '100%',
    flexDirection: 'column',
    gap: '10px',
    padding: '20px',
    display: isMenuOpen ? 'flex' : 'none',
  };

  const mobileMenuIconStyle = {
    display: 'block',
  };

  return (
    <nav style={navbarStyle}>
      <div style={logoStyle}>
        <a href="/">Blocksupply</a>
      </div>
      <div style={menuStyle}>
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex' }}>
          <li><a href="/" style={menuItemStyle}>Home</a></li>
          <li><a href="/product" style={menuItemStyle}>Product Verification</a></li>
          <li><a href="/manufacturer" style={menuItemStyle}>Manufacturer Dashboard</a></li>
          <li><a href="/reviews" style={menuItemStyle}>Consumer Reviews</a></li>
          <li><a href="/supply-chain" style={menuItemStyle}>Supply Chain Tracker</a></li>
        </ul>
      </div>
      <div style={mobileMenuIconStyle} onClick={toggleMenu}>
        <div style={barStyle}></div>
        <div style={barStyle}></div>
        <div style={barStyle}></div>
      </div>
      {/* Mobile Menu */}
      <div style={mobileMenuStyle}>
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
          <li><a href="/" style={{ ...menuItemStyle, ...menuItemHoverStyle }}>Home</a></li>
          <li><a href="/product" style={{ ...menuItemStyle, ...menuItemHoverStyle }}>Product Verification</a></li>
          <li><a href="/manufacturer" style={{ ...menuItemStyle, ...menuItemHoverStyle }}>Manufacturer Dashboard</a></li>
          <li><a href="/reviews" style={{ ...menuItemStyle, ...menuItemHoverStyle }}>Consumer Reviews</a></li>
          <li><a href="/supply-chain" style={{ ...menuItemStyle, ...menuItemHoverStyle }}>Supply Chain Tracker</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
