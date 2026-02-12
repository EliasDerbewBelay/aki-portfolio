import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full py-6 px-8 flex justify-between items-center border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <Link href="/" className="font-black text-2xl tracking-tighter">
        <Image src="/portLogo.png" alt="logo" width={80} height={80} />
      </Link>
      <div className="space-x-8 text-sm font-medium text-gray-500">
        <Link href="/" className="hover:text-black transition-colors">
          WORK
        </Link>
        <Link href="/about" className="hover:text-black transition-colors">
          ABOUT
        </Link>
        <Link
          href="mailto:yourbrother@email.com"
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
        >
          HIRE ME
        </Link>
      </div>
    </nav>
  );
}
