"use client";

import Link from "next/link";
import { Mail, Heart, Sparkles, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0047FF] to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Brand Column - Takes more space */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#0047FF]" />
              <h3 className="text-lg font-bold bg-gradient-to-r from-[#0047FF] to-[#00D1FF] bg-clip-text text-transparent">
                Aklilu Derbew
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
              Graphic designer and video editor creating visual experiences that
              blend creativity with purpose. Let's bring your ideas to life.
            </p>

            {/* Email Contact */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4 text-[#0047FF]" />
              <a
                href="mailto:Jornalistaklilu@gmail.com"
                className="hover:text-[#0047FF] transition-colors"
              >
                Jornalistaklilu@gmail.com
              </a>
            </div>
          </div>

          {/* Social Links - Moved to the right */}
          <div className="space-y-4 md:text-right">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="https://t.me/aki_project"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#0047FF] group-hover:to-[#00D1FF] transition-all duration-300">
                  <svg
                    className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248c-.183 1.974-.973 6.83-1.376 9.063-.17.97-.505 1.295-.83 1.327-.705.07-1.24-.466-1.923-.914-1.067-.702-1.67-1.138-2.705-1.822-1.197-.79-.421-1.225.262-1.934.18-.187 3.289-3.014 3.349-3.27.008-.034.015-.158-.06-.224-.074-.066-.184-.043-.263-.025-.113.025-1.9 1.207-5.364 3.545-.508.349-.967.519-1.378.51-.454-.01-1.327-.257-1.977-.468-.797-.26-1.43-.398-1.375-.84.03-.231.346-.467.952-.708 3.714-1.618 6.193-2.685 7.438-3.202 3.541-1.468 4.277-1.722 4.757-1.73.106-.002.342.024.495.147.129.104.165.244.17.352.005.107.005.244-.004.39z" />
                  </svg>
                </div>
              </Link>

              <Link
                href="https://www.instagram.com/aki.project7"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#0047FF] group-hover:to-[#00D1FF] transition-all duration-300">
                  <svg
                    className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                  </svg>
                </div>
              </Link>

              <Link
                href="https://www.linkedin.com/in/aklilu-derbew-810058352/"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#0047FF] group-hover:to-[#00D1FF] transition-all duration-300">
                  <svg
                    className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
              </Link>

              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#0047FF] group-hover:to-[#00D1FF] transition-all duration-300">
                  <svg
                    className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 7.6c-.8.3-1.6.5-2.4.6.9-.5 1.6-1.3 1.9-2.3-.9.5-1.9.8-2.9.9-1.5-1.5-3.9-.8-4.5 1.2-.1.5-.1 1 0 1.5-2.7-.1-5.3-1.4-7-3.5-.9 1.5-.5 3.4 1 4.3-.7 0-1.4-.2-2-.5 0 1.6 1.1 3 2.7 3.3-.6.2-1.2.2-1.9.1.6 1.8 2.3 3 4.2 3-1.5 1.2-3.5 1.8-5.6 1.6 10.3 3.3 16.6-5.6 16.6-10.4 0-.2 0-.4-.1-.6 1-.7 1.7-1.5 2.3-2.4z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative pt-8 mt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
              © {new Date().getFullYear()} Aklilu Derbew.
              <span className="hidden sm:inline mx-1">•</span>
              <span className="flex items-center gap-1">
                Crafted with{" "}
                <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for
                creative minds
              </span>
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-xs text-gray-500 dark:text-gray-500 hover:text-[#0047FF] dark:hover:text-[#00D1FF] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-gray-500 dark:text-gray-500 hover:text-[#0047FF] dark:hover:text-[#00D1FF] transition-colors"
              >
                Terms of Use
              </Link>

              {/* Scroll to Top Button */}
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-[#0047FF] hover:to-[#00D1FF] hover:text-white transition-all duration-300"
                onClick={scrollToTop}
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}