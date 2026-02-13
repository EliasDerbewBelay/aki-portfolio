import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "../ui/theme-toggle";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="w-full py-6 px-8 flex justify-between items-center border-b sticky top-0 backdrop-blur-md z-50">
      <Link href="/">
        <Image
          src="/portLogo.png"
          alt="logo"
          width={50}
          height={50}
          className="object-cover"
        />
      </Link>
      <div className="space-x-8 text-sm font-medium">
        <ModeToggle />
        <Link href="/" className="transition-colors">
          WORK
        </Link>
        <Link href="/about" className="transition-colors">
          ABOUT
        </Link>
        <Link
          href="mailto:Jornalistaklilu@gmail.com"
          className="bg-black text-white px-4 py-2 rounded-md transition-all"
        >
          <Button>HIRE ME</Button>
        </Link>
      </div>
    </nav>
  );
}
