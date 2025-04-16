// components/QRCodeScanner.js
import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRCodeScanner = ({ onScan }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    const scanner = new Html5QrcodeScanner('qr-reader', {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      (decodedText, decodedResult) => {
        onScan(decodedText);
      },
      (errorMessage) => {
        console.warn('QR Code Scan Error:', errorMessage);
      }
    );

    return () => {
      scanner.clear().catch((error) => {
        console.error('Failed to clear QR scanner', error);
      });
    };
  }, [onScan]);

  return <div id="qr-reader" ref={scannerRef} />;
};

export default QRCodeScanner;
