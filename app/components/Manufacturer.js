import Link from 'next/link';

export default function ManufacturerNavbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-[#1c052d] text-white shadow-md">
      <div className="text-2xl font-bold text-purple-400">BS</div>

      <div className="flex space-x-6 text-lg">
        <Link href="../manufacturer" className="hover:text-purple-300 transition duration-300">Dashboard</Link>
        <Link href="../manufacturer/profile" className="hover:text-purple-300 transition duration-300">Register</Link>
      </div>
    </nav>
  );
}
