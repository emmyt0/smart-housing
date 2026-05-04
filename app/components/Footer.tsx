// components/Footer.tsx

"use client";

import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight,
  Heart,
  Clock
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const locations = [
    "Gemikonagi",
    "Lefke",
    "Lefke Merkezi",
    "Guzelyurt",
    "Doganci",
    "Yesilyurt",
    "Yedidalga"
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "For Property Owners", href: "/sellers" },
    { name: "FAQs", href: "/help-center" },
    { name: "Contact", href: "/about-us" }
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Safety Tips", href: "/safety" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" }
  ];

  // 🔥 slug helper
  const toSlug = (text: string) =>
    text.toLowerCase().replace(/\s+/g, "-");

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/* TOP */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12 pb-10 border-b border-gray-800">

          {/* BRAND */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-red-500 text-2xl font-bold">
                smart-housing
              </span>
            </Link>

            <p className="text-gray-400 max-w-md text-sm">
              Connecting students with trusted accommodation. Find your perfect home near campus.
            </p>
          </div>
        </div>

        {/* LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* LOCATIONS */}
          <div>
            <h3 className="text-sm font-semibold text-blue-400 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Popular Locations
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {locations.map((location) => (
                <Link
                  key={location}
                  href={`/location/${toSlug(location)}`}
                  className="text-sm text-gray-400 hover:text-white flex items-center gap-2 group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  {location}
                </Link>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-sm font-semibold text-blue-400 mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-semibold text-blue-400 mb-4">
              Contact Us
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-400">
                  European University of Lefke,<br />
                  Northern Cyprus
                </p>
              </div>

              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <a className="text-sm text-gray-400 hover:text-white" href="mailto:support@eulhousing.com">
                  support@eulhousing.com
                </a>
              </div>

              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <a className="text-sm text-gray-400 hover:text-white" href="tel:+903922000000">
                  +90 392 200 00 00
                </a>
              </div>

              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-400">
                  Mon - Fri: 9:00 - 18:00
                </p>
              </div>
            </div>

            {/* SOCIALS */}
            <div className="flex gap-3 mt-6">
              <a className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600">
                <Facebook size={18} />
              </a>
              <a className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400">
                <Twitter size={18} />
              </a>
              <a className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600">
                <Instagram size={18} />
              </a>
              <a className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Heart className="w-4 h-4 text-red-500" />
            © {currentYear} smart-housing
          </div>
        </div>
      </div>
    </footer>
  );
}