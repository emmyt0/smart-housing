"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User, Globe, Sparkles } from "lucide-react";

const LOCATIONS = [
  "Gemikonagi",
  "Lefke",
  "Lefke Merkezi",
  "Guzelyurt",
  "Doganci",
  "Yesilyurt",
  "Yedidalga",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "TR">("EN");
  const [activeLocation, setActiveLocation] = useState("Gemikonagi");

  return (
    <nav className="w-full border-b border-gray-200/60 bg-white/90 backdrop-blur-xl sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-5">
        {/* TOP ROW */}
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center  gap-2 group ">
            <div className="relative">
              <div className="absolute -inset-1 " />
              
            </div>
            <span className="text-red-600    ">
              <p className=" text-2xl  font-bold"> smart-housing</p>
              
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {["Shared", "Seller"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="relative text-sm font-medium text-gray-700 hover:text-gray-900 group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Language */}
            <button
              onClick={() => setLang(lang === "EN" ? "TR" : "EN")}
              className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <Globe size={16} />
              {lang}
            </button>

            {/* Profile */}
            <button className="rounded-full p-2 hover:bg-gray-50 transition">
              <User size={22} className="text-gray-700" />
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden rounded-full p-2 hover:bg-gray-50 transition"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* LOCATION PILLS (Airbnb-style) */}
        <div className="hidden md:flex justify-center pb-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {LOCATIONS.map((location) => {
              const active = activeLocation === location;

              return (
                <button
                  key={location}
                  onClick={() => setActiveLocation(location)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition
                    ${
                      active
                        ? "bg-black text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
        <div className="md:hidden border-t bg-white">
          <div className="flex flex-col gap-2 px-5 py-4">
            {["Shared", "Seller"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {item}
              </Link>
            ))}

            <div className="pt-3 border-t">
              {LOCATIONS.map((location) => (
                <button
                  key={location}
                  onClick={() => {
                    setActiveLocation(location);
                    setOpen(false);
                  }}
                  className={`w-full text-left rounded-xl px-4 py-2 text-sm transition
                    ${
                      activeLocation === location
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
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
  );
}
