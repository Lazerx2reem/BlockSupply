import { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRCodeScanner = ({ onScan }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('qr-reader', {
      fps: 10,
      qrbox: 250,
      rememberLastUsedCamera: true,
      supportedScanTypes: [Html5QrcodeScanner.SCAN_TYPE_CAMERA, Html5QrcodeScanner.SCAN_TYPE_FILE]
    });

    scanner.render(
      (decodedText) => {
        onScan(decodedText);
        scanner.clear();
      },
      (error) => {
        console.warn('QR Scan Error:', error);
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [onScan]);

  return (
    <div className="text-center">
      <div id="qr-reader" className="mx-auto" />

      {/* Optional: Add a visible label for file drop */}
      <p className="mt-4 text-gray-600 text-sm font-medium">
        Or drop an image with a QR code above 👆
      </p>
    </div>
  );
};

export default QRCodeScanner;
