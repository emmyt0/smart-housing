"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User, Globe, Home, HelpCircle, Mail } from "lucide-react";
import LoginModal from "./LoginModal";

const LOCATIONS = [
  "Studio (1+0)",
  "1+1",
  "2+1",
  "3+1",
  "Single Room",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "TR">("EN");
  const [activeLocation, setActiveLocation] = useState("Gemikonagi");
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <nav className="w-full border-b border-gray-100 bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* TOP ROW */}
          <div className="flex h-20 items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                {/* FIX: prevent blocking clicks */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300 pointer-events-none" />
                
                <div className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-2">
                  <Home size={24} className="text-white" />
                </div>
              </div>

              <span className="flex flex-col">
                <p className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  smart-housing
                </p>
                <p className="text-xs text-gray-500 -mt-1">
                  Find Your Perfect apartment
                </p>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/help-center"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 group px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                <HelpCircle size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                <span>Help Center</span>
              </Link>

              <Link
                href="/about-us"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 group px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                <Mail size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                <span>About Us</span>
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              
              {/* Language */}
              <button
                type="button"
                onClick={() => setLang(lang === "EN" ? "TR" : "EN")}
                className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-sm cursor-pointer"
              >
                <Globe size={16} className="text-gray-500" />
                <span className="font-semibold">{lang}</span>
              </button>

              {/* ✅ FIXED Profile Button */}
              <button
                type="button"
                onClick={() => setLoginOpen(true)}
                className="relative z-10 rounded-full p-2 hover:bg-gray-50 transition-all duration-300 border border-gray-200 cursor-pointer"
              >
                <User size={20} className="text-gray-600" />
              </button>

              {/* Mobile Menu */}
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="md:hidden rounded-full p-2 hover:bg-gray-50 transition-all duration-300 border border-gray-200 cursor-pointer"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* LOCATION PILLS */}
          <div className="hidden md:flex justify-center pb-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar bg-gray-50/80 p-1.5 rounded-2xl backdrop-blur-sm">
              {LOCATIONS.map((location) => {
                const active = activeLocation === location;

                return (
                  <button
                    key={location}
                    type="button"
                    onClick={() => setActiveLocation(location)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 cursor-pointer
                      ${
                        active
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25 scale-105"
                          : "text-gray-600 hover:bg-white/80 hover:text-gray-900"
                      }`}
                  >
                    {location}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl">
            <div className="flex flex-col gap-1 px-4 py-3">
              
              {/* Support */}
              <div className="py-2 border-b border-gray-100">
                <p className="px-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Support
                </p>

                <Link
                  href="/help-center"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300"
                >
                  <HelpCircle size={18} className="text-gray-400" />
                  Help Center
                </Link>

                <Link
                  href="/about-us"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300"
                >
                  <Mail size={18} className="text-gray-400" />
                  Contact Us
                </Link>
              </div>

              {/* Property Types */}
              <div className="py-2">
                <p className="px-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Property Types
                </p>

                {LOCATIONS.map((location) => (
                  <button
                    key={location}
                    type="button"
                    onClick={() => {
                      setActiveLocation(location);
                      setOpen(false);
                    }}
                    className={`w-full text-left rounded-xl px-4 py-3 text-sm transition-all duration-300 cursor-pointer
                      ${
                        activeLocation === location
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md"
                          : "hover:bg-gray-50 text-gray-600"
                      }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ✅ LOGIN MODAL OUTSIDE NAV + HIGH Z-INDEX */}
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
      />
    </>
  );
}