"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User, Globe, Sparkles } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "TR">("EN");

  return (
    <nav className="w-full border-b border-gray-200/50 bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                <Sparkles size={18} className="text-white" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              MyApp
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            <Link 
              href="/shared" 
              className="relative text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
            >
              Shared
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/seller" 
              className="relative text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
            >
              Seller
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === "EN" ? "TR" : "EN")}
              className="flex items-center gap-2 rounded-2xl border border-gray-300/60 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50/80 hover:border-gray-400/30 transition-all duration-200 hover:shadow-sm backdrop-blur-sm"
            >
              <Globe size={16} className="text-gray-600" />
              <span className="font-semibold">{lang}</span>
              <div className={`w-8 h-5 flex items-center rounded-full p-0.5 transition-all duration-300 ${lang === "TR" ? "bg-blue-500 justify-end" : "bg-gray-300 justify-start"}`}>
                <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm"></div>
              </div>
            </button>

            {/* Profile */}
            <button className="rounded-2xl p-2.5 hover:bg-gray-50/80 transition-all duration-200 hover:shadow-sm border border-transparent hover:border-gray-300/30">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-0 hover:opacity-20 transition duration-300"></div>
                <User size={24} className="text-gray-700" />
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden rounded-2xl p-2.5 hover:bg-gray-50/80 transition-all duration-200 hover:shadow-sm"
            >
              {open ? (
                <X className="text-gray-700" size={24} />
              ) : (
                <Menu className="text-gray-700" size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-xl animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-1 px-5 py-4">
            <Link
              href="/shared"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 transition-all duration-200 group"
            >
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
              Shared
            </Link>
            <Link
              href="/seller"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 transition-all duration-200 group"
            >
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
              Seller
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}