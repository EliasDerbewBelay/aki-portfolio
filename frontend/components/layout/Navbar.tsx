"use client";

import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "../ui/theme-toggle";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    closeMenu();

    // Check if we're on the home page
    if (window.location.pathname !== "/") {
      // If not on home page, navigate to home with hash
      window.location.href = `/#${sectionId}`;
      return;
    }

    // If on home page, scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <nav
        className={`w-full py-4 px-6 md:px-8 flex justify-between items-center fixed top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm"
            : "bg-transparent backdrop-blur-sm border-b border-transparent"
        }`}
      >
        {/* Logo with hover effect */}
        <Link href="/" className="relative group" onClick={closeMenu}>
          <div className="relative w-[50px] h-[50px] transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/portLogo.png"
              alt="Aklilu Derbew - Graphic Designer"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* Subtle glow effect on hover */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#0047FF]/20 to-[#00D1FF]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ModeToggle />

          <button
            onClick={() => scrollToSection("selected-works")}
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#0047FF] dark:hover:text-[#00D1FF] transition-colors relative group"
          >
            WORK
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0047FF] to-[#00D1FF] group-hover:w-full transition-all duration-300" />
          </button>

          <button
            onClick={() => scrollToSection("about-me")}
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#0047FF] dark:hover:text-[#00D1FF] transition-colors relative group"
          >
            ABOUT
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0047FF] to-[#00D1FF] group-hover:w-full transition-all duration-300" />
          </button>

          {/* Fixed: Use div instead of button wrapper */}
          <div onClick={() => scrollToSection("hire-me")}>
            <Button className="bg-gradient-to-r from-[#0047FF] to-[#00D1FF] text-white hover:shadow-lg hover:shadow-[#0047FF]/25 transition-all duration-300 hover:scale-105 cursor-pointer">
              HIRE ME
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ModeToggle />
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-950 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="relative w-[40px] h-[40px]">
              <Image
                src="/portLogo.png"
                alt="Aklilu Derbew"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex-1 p-6">
            <div className="flex flex-col space-y-6">
              <button
                onClick={() => scrollToSection("selected-works")}
                className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-[#0047FF] dark:hover:text-[#00D1FF] transition-colors text-left"
              >
                WORK
              </button>
              <button
                onClick={() => scrollToSection("about-me")}
                className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-[#0047FF] dark:hover:text-[#00D1FF] transition-colors text-left"
              >
                ABOUT
              </button>

              {/* Fixed: Use div wrapper for mobile */}
              <div onClick={() => scrollToSection("hire-me")}>
                <Button className="w-full bg-gradient-to-r from-[#0047FF] to-[#00D1FF] text-white hover:shadow-lg transition-all duration-300 cursor-pointer">
                  HIRE ME
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              © {new Date().getFullYear()} Aklilu Derbew
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
