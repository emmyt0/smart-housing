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

// ✅ THESE MUST MATCH API SLUGS
const PROPERTY_TYPES = [
  {
    label: "Studio (1+0)",
    slug: "studio",
  },

  {
    label: "1+1 Apartment",
    slug: "1-plus-1",
  },

  {
    label: "2+1 Apartment",
    slug: "2-plus-1",
  },

  {
    label: "3+1 Apartment",
    slug: "3-plus-1",
  },

  {
    label: "House",
    slug: "house",
  },

  {
    label: "Single Room",
    slug: "single-room",
  },
];

export default function Navbar() {
  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const [activeProperty, setActiveProperty] =
    useState("");

  const [loginOpen, setLoginOpen] =
    useState(false);

  const { user, logout } =
    useAuth();

  const handlePropertyTypeClick = (
    slug: string,
    label: string
  ) => {
    setActiveProperty(label);

    router.push(
      `/property-type/${slug}`
    );
  };

  return (
    <>
      <nav className="w-full border-b border-gray-100 bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* TOP */}
          <div className="flex h-20 items-center justify-between">

            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-lg blur opacity-60" />

                <div className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-2">
                  <Home
                    size={24}
                    className="text-white"
                  />
                </div>
              </div>

              <span className="flex flex-col">
                <p className="text-xl font-bold">
                  apartments
                </p>

                <p className="text-xs text-gray-500">
                  Find Your Perfect apartment
                </p>
              </span>
            </Link>

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/help-center"
                className="flex items-center gap-2 text-sm"
              >
                <HelpCircle size={18} />
                <span>Help Center</span>
              </Link>

              <Link
                href="/about-us"
                className="flex items-center gap-2 text-sm"
              >
                <Mail size={18} />
                <span>About Us</span>
              </Link>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">

              {/* AUTH */}
              {user ? (
                <div className="flex items-center gap-3">

                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border">

                    <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold">
                      {user.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <span className="text-sm font-semibold text-gray-700">
                      {user.name ||
                        user.email}
                    </span>
                  </div>

                  <button
                    onClick={logout}
                    className="rounded-full p-2 hover:bg-gray-100 border"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() =>
                    setLoginOpen(true)
                  }
                  className="rounded-full p-2 hover:bg-gray-50 border"
                >
                  <User size={20} />
                </button>
              )}

              {/* MOBILE */}
              <button
                onClick={() =>
                  setOpen(!open)
                }
                className="md:hidden rounded-full p-2 hover:bg-gray-50 border"
              >
                {open ? (
                  <X size={20} />
                ) : (
                  <Menu size={20} />
                )}
              </button>
            </div>
          </div>

          {/* PROPERTY TYPES */}
          <div className="hidden md:flex justify-center pb-4">
            <div className="flex gap-2 overflow-x-auto bg-gray-50 p-1.5 rounded-2xl">

              {PROPERTY_TYPES.map(
                (property) => {
                  const active =
                    activeProperty ===
                    property.label;

                  return (
                    <button
                      key={
                        property.slug
                      }
                      onClick={() =>
                        handlePropertyTypeClick(
                          property.slug,
                          property.label
                        )
                      }
                      className={`px-5 py-2.5 rounded-xl text-sm transition whitespace-nowrap
                      ${
                        active
                          ? "bg-red-500 text-white"
                          : "text-gray-600 hover:bg-white"
                      }`}
                    >
                      {property.label}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden border-t bg-white">
            <div className="flex flex-col px-4 py-3">

              <Link
                href="/help-center"
                onClick={() =>
                  setOpen(false)
                }
                className="py-2"
              >
                Help Center
              </Link>

              <Link
                href="/about-us"
                onClick={() =>
                  setOpen(false)
                }
                className="py-2"
              >
                About Us
              </Link>

              <div className="my-2 h-px bg-gray-100" />

              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider py-2">
                Property Types
              </p>

              {PROPERTY_TYPES.map(
                (property) => (
                  <button
                    key={
                      property.slug
                    }
                    onClick={() => {
                      handlePropertyTypeClick(
                        property.slug,
                        property.label
                      );

                      setOpen(false);
                    }}
                    className="text-left py-2 hover:text-red-500 transition"
                  >
                    {property.label}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </nav>

      <LoginModal
        open={loginOpen}
        onClose={() =>
          setLoginOpen(false)
        }
      />
    </>
  );
}