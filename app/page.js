"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 py-10">
      <section className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to <span className="text-blue-500">Blocksupply</span>
        </h1>
        <p className="text-xl text-gray-300 mb-10">
          A decentralized solution for verifying supply chain authenticity — from luxury goods to medicine.
        </p>

        <div className="flex justify-center gap-6 mb-16 flex-wrap">
          <Link href="/product">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-lg font-semibold transition-all">
              Verify Product
            </button>
          </Link>

          <Link href="/manufacturer">
            <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl text-lg font-semibold transition-all">
              Manufacturer Dashboard
            </button>
          </Link>

          <Link href="/reviews">
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl text-lg font-semibold transition-all">
              Reviews
            </button>
          </Link>

          <Link href="/tracker">
            <button className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-xl text-lg font-semibold transition-all">
              Supply Chain Tracker
            </button>
          </Link>
        </div>

        <div className="text-gray-400 max-w-3xl mx-auto">
          <p className="mb-4">
            ✨ Powered by blockchain technology, Blocksupply helps consumers verify the authenticity of goods using barcodes and immutable data.
          </p>
          <p>
            ✅ Track a product's journey, 📦 ensure supply chain integrity, and 🛡️ protect against counterfeits — all on-chain.
          </p>
        </div>
      </section>
    </main>
  );
}
