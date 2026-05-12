"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  User,
  Home,
  HelpCircle,
  Mail,
  LogOut,
} from "lucide-react";
import LoginModal from "./LoginModal";
import { useAuth } from "../Provider";

// Update LOCATIONS to map with proper slugs
const LOCATIONS = [
  { label: "Studio (1+0)", slug: "studio" },
  { label: "1+1", slug: "1+1" },
  { label: "2+1", slug: "2+1" },
  { label: "3+1", slug: "3+1" },
  { label: "Single Room", slug: "single-room" },
];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState("Gemikonagi");
  const [loginOpen, setLoginOpen] = useState(false);

  const { user, logout } = useAuth();

  // Handle navigation to property type page
  const handlePropertyTypeClick = (slug: string, label: string) => {
    setActiveLocation(label);
    router.push(`/property-type/${slug}`);
  };

  return (
    <>
      <nav className="w-full border-b border-gray-100 bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* TOP ROW */}
          <div className="flex h-20 items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
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
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                <HelpCircle size={18} />
                <span>Help Center</span>
              </Link>

              <Link
                href="/about-us"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                <Mail size={18} />
                <span>About Us</span>
              </Link>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">

              {/* 🔐 AUTH */}
              {user ? (
                <div className="flex items-center gap-3">
                  
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border">
                    
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>

                    {/* Name */}
                    <span className="text-sm font-semibold text-gray-700">
                      {user.name || user.email}
                    </span>
                  </div>

                  {/* Logout */}
                  <button
                    onClick={logout}
                    className="rounded-full p-2 hover:bg-gray-100 border"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="rounded-full p-2 hover:bg-gray-50 border"
                >
                  <User size={20} />
                </button>
              )}

              {/* Mobile Menu */}
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden rounded-full p-2 hover:bg-gray-50 border"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* LOCATION PILLS - Updated to navigate to property types */}
          <div className="hidden md:flex justify-center pb-4">
            <div className="flex gap-2 overflow-x-auto bg-gray-50 p-1.5 rounded-2xl">
              {LOCATIONS.map((location) => {
                const active = activeLocation === location.label;

                return (
                  <button
                    key={location.label}
                    onClick={() => handlePropertyTypeClick(location.slug, location.label)}
                    className={`px-5 py-2.5 rounded-xl text-sm transition whitespace-nowrap
                      ${
                        active
                          ? "bg-red-500 text-white"
                          : "text-gray-600 hover:bg-white"
                      }`}
                  >
                    {location.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* MOBILE MENU - Updated with navigation */}
        {open && (
          <div className="md:hidden border-t bg-white">
            <div className="flex flex-col px-4 py-3">

              <Link 
                href="/help-center" 
                onClick={() => setOpen(false)} 
                className="py-2 hover:text-red-500 transition"
              >
                Help Center
              </Link>

              <Link 
                href="/about-us" 
                onClick={() => setOpen(false)} 
                className="py-2 hover:text-red-500 transition"
              >
                About Us
              </Link>

              {/* Divider */}
              <div className="my-2 h-px bg-gray-100" />
              
              {/* Property Types in Mobile Menu */}
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider py-2">
                Property Types
              </p>
              
              {LOCATIONS.map((location) => (
                <button
                  key={location.label}
                  onClick={() => {
                    handlePropertyTypeClick(location.slug, location.label);
                    setOpen(false);
                  }}
                  className="text-left py-2 hover:text-red-500 transition"
                >
                  {location.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* LOGIN MODAL */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}