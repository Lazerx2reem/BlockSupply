import './globals.css';

export const metadata = {
  title: 'BlockSupply - Smart SupplyChain Tracker',
  description: 'Connect wallet and access personalized dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen font-sans">
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
