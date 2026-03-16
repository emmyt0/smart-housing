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
    { name: "How It Works", href: "/how-it-works" },
    { name: "For Students", href: "/students" },
    { name: "For Property Owners", href: "/sellers" },
    { name: "FAQs", href: "/faqs" },
    { name: "Contact", href: "/contact" }
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Safety Tips", href: "/safety" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top Section - Brand & Stats */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16 pb-8 lg:pb-12 border-b border-gray-800">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center  gap-2 group ">
            <div className="relative">
              <div className="absolute -inset-1 " />
              
            </div>
            <span className="text-red-600    ">
              <p className=" text-2xl  font-bold"> smart-housing</p>
              
            </span>
          </Link>
            
            <p className="text-gray-400 max-w-md text-sm leading-relaxed">
              Connecting EUL students with trusted accommodation. Find your perfect home near campus with verified listings and secure booking.
            </p>
            
            
          </div>
          
          
        </div>

        {/* Middle Section - Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Popular Locations */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Popular Locations
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {locations.map((location) => (
                <Link
                  key={location}
                  href={`/properties?location=${encodeURIComponent(location)}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors group flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  {location}
                </Link>
              ))}
            </div>
            
           
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors group flex items-center gap-2"
                  >
                    <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          
          {/* Contact Info & Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-4">
              Contact Us
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <p className="text-sm text-gray-400">
                  European University of Lefke,<br />
                  Lefke, Northern Cyprus
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <a href="mailto:support@eulhousing.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                  support@eulhousing.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <a href="tel:+903922000000" className="text-sm text-gray-400 hover:text-white transition-colors">
                  +90 392 200 00 00
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <p className="text-sm text-gray-400">
                  Mon-Fri: 9:00 - 18:00
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-3">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="w-5 h-5 text-gray-400 hover:text-white" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Twitter className="w-5 h-5 text-gray-400 hover:text-white" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-5 h-5 text-gray-400 hover:text-white" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Newsletter & Copyright */}
        <div className="pt-8 border-t border-gray-800">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Newsletter */}
            

            {/* Copyright & Badges */}
            <div className="flex flex-col sm:flex-row lg:justify-end items-start lg:items-center gap-6">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <p className="text-xs text-gray-400">
                  © {currentYear} smart-housing. All rights reserved.
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      
    </footer>
  );
}