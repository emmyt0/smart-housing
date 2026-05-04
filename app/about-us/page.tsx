"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function AboutUsPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 4000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          About Smart Housing
        </h1>
        <p className="max-w-xl mx-auto text-gray-500 text-lg">
          We help students and professionals find modern, comfortable apartments with ease.
        </p>
      </section>

      {/* Simple Stats */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-8">
          <div>
            <p className="text-3xl font-bold text-red-500">500+</p>
            <p className="text-sm text-gray-400">Apartments</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-red-500">1.2k+</p>
            <p className="text-sm text-gray-400">Happy Users</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-red-500">20+</p>
            <p className="text-sm text-gray-400">Locations</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-red-500">4.8★</p>
            <p className="text-sm text-gray-400">Rating</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
          <p className="text-gray-400 text-sm">We'd love to hear from you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
              <Mail size={18} className="text-red-500" />
              <a href="mailto:hello@smarthousing.com" className="text-gray-600 text-sm hover:text-red-500 transition">
                hello@smarthousing.com
              </a>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
              <Phone size={18} className="text-red-500" />
              <a href="tel:+1234567890" className="text-gray-600 text-sm hover:text-red-500 transition">
                +1 (234) 567-8900
              </a>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
              <MapPin size={18} className="text-red-500" />
              <span className="text-gray-600 text-sm">New York, NY 10001</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-5">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-green-500 font-medium mb-1">Thanks!</div>
                <p className="text-sm text-gray-500">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm"
                />
                <textarea
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm resize-none"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 text-sm"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size="14" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-16 px-6 text-center bg-red-500">
        <h2 className="text-2xl font-bold text-white mb-2">Find Your Perfect Home</h2>
        <p className="text-white/80 text-sm mb-5">Start browsing apartments today</p>
        <button className="bg-white text-red-500 font-medium px-6 py-2 rounded-xl text-sm hover:shadow-lg transition">
          Explore Listings
        </button>
      </section>

    </div>
  );
}