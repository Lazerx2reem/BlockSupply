import Link from 'next/link';

export default function CustomerNavbar() {
    return (
      <nav className="w-full flex items-center justify-between px-6 py-4 bg-[#1c052d] text-white shadow-md">
      <Link href="/" className="hover:text-purple-300 transition duration-300">BS</Link>
      </nav>
    );
  }
  