import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRCodeScanner = ({ onScan }) => {
  const [permissionRequested, setPermissionRequested] = useState(false);

  const requestCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setPermissionRequested(true);
    } catch (error) {
      alert("Camera permission denied.");
    }
  };

  useEffect(() => {
    if (!permissionRequested) return;

    const scanner = new Html5QrcodeScanner('qr-reader', { fps: 10, qrbox: 250 });
    scanner.render(
      (decodedText) => {
        onScan(decodedText);
        scanner.clear();
      },
      (error) => console.warn(error)
    );

    return () => scanner.clear().catch(() => {});
  }, [permissionRequested]);

  return (
    <div className="text-center mb-6">
      {!permissionRequested ? (
        <button
          onClick={requestCamera}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition"
        >
          🎥 Enable Camera to Scan QR
        </button>
      ) : (
        <div id="qr-reader" className="w-full" />
      )}
    </div>
  );
};

export default QRCodeScanner;
