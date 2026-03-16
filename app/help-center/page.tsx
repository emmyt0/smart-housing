"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Home,
  FileText,
  Users,
  CreditCard,
  Key,
  Shield,
  
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    category: "Booking & Payments",
    icon: <CreditCard size={20} />,
    questions: [
      {
        q: "How do I book an apartment?",
        a: "You can book an apartment by browsing our listings, selecting your preferred property, and clicking the 'Book Now' button. You'll need to create an account or log in to complete the booking process. Our secure payment system accepts all major credit cards and bank transfers."
      },
      {
        q: "What is the cancellation policy?",
        a: "Cancellation policies vary by property. Most listings offer free cancellation up to 7 days before check-in. For specific cancellation terms, please check the property's listing page under 'Policies' before booking."
      },
      {
        q: "Is a deposit required?",
        a: "Yes, most properties require a security deposit which is fully refundable upon check-out, provided there are no damages or policy violations. The deposit amount varies by property and is clearly stated in the listing."
      },
      {
        q: "Can I pay in installments?",
        a: "Some property owners offer installment payment plans for long-term rentals. Please contact the property owner directly through our platform to discuss payment options."
      }
    ]
  },
  {
    category: "Properties & Listings",
    icon: <Home size={20} />,
    questions: [
      {
        q: "How do I know if a property is available?",
        a: "Our calendar system shows real-time availability. If you see available dates, the property is ready to book. Green dates are available, red are booked, and gray are blocked by the owner."
      },
      {
        q: "Are the photos on the listings recent?",
        a: "We require property owners to update their photos every 6 months. All listings have a 'Photo Updated' date to ensure you're seeing current representations of the property."
      },
      {
        q: "Can I visit the property before booking?",
        a: "Many property owners offer virtual tours or in-person viewings. Use the 'Contact Owner' button on the listing page to schedule a viewing before booking."
      }
    ]
  },
  {
    category: "Tenant Guidelines",
    icon: <Users size={20} />,
    questions: [
      {
        q: "What documents do I need to rent?",
        a: "Typically, you'll need a valid ID/passport, proof of income or employment, and sometimes references. International students may need to provide student visa and enrollment documents."
      },
      {
        q: "Are utilities included in the rent?",
        a: "Utility inclusion varies by property. Some listings include water and electricity, while others require separate payments. Check the 'Amenities' section of each listing for details."
      },
      {
        q: "Can I have guests stay over?",
        a: "Guest policies vary by property. Most allow short-term guests, but extended stays may require owner approval. Check the property rules in the listing or discuss with the owner."
      }
    ]
  },
  {
    category: "Safety & Security",
    icon: <Shield size={20} />,
    questions: [
      {
        q: "How do you verify property owners?",
        a: "We verify all property owners through government ID verification, property ownership documents, and in some cases, in-person meetings. Verified owners have a blue checkmark badge on their profile."
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. We use 256-bit SSL encryption for all transactions. Your payment information is never stored on our servers and is processed through PCI-compliant payment gateways."
      },
      {
        q: "What if I encounter issues during my stay?",
        a: "Our 24/7 support team is always available. You can reach us through the app, website, or emergency hotline. We'll help resolve any issues with the property or owner immediately."
      }
    ]
  },
  {
    category: "Moving In/Out",
    icon: <Key size={20} />,
    questions: [
      {
        q: "How do I get the keys?",
        a: "Key handover methods vary. Some owners meet you in person, others use secure key boxes. This information is provided after booking in your 'Reservation Details' section."
      },
      {
        q: "What's the check-in/check-out process?",
        a: "Standard check-in is after 2 PM and check-out before 11 AM. Specific instructions, including any codes or access information, are sent to you 24 hours before your arrival."
      }
    ]
  }
];

const popularTopics = [
  { icon: <Home size={18} />, title: "Finding a Property", color: "bg-blue-500" },
  { icon: <CreditCard size={18} />, title: "Payments", color: "bg-green-500" },
  { icon: <Key size={18} />, title: "Moving In", color: "bg-purple-500" },
  { icon: <Shield size={18} />, title: "Safety", color: "bg-red-500" },
  { icon: <Users size={18} />, title: "Tenant Rights", color: "bg-yellow-500" },
  { icon: <FileText size={18} />, title: "Contracts", color: "bg-indigo-500" }
];

const contactMethods = [
  {
    icon: <MessageCircle size={24} />,
    title: "Live Chat",
    description: "Chat with our support team",
    action: "Start Chat",
    color: "from-green-500 to-green-600",
    available: true
  },
  {
    icon: <Mail size={24} />,
    title: "Email Support",
    description: "Get a response within 24h",
    action: "support@lefke-apartments.com",
    color: "from-blue-500 to-blue-600",
    available: true
  },
  {
    icon: <Phone size={24} />,
    title: "Phone Support",
    description: "24/7 emergency line",
    action: "+90 (123) 456-7890",
    color: "from-purple-500 to-purple-600",
    available: true
  }
];

export default function HelpPage() {
  const [openFaqs, setOpenFaqs] = useState<{ [key: string]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleFaq = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenFaqs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

     
      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about renting through Lefke Apartments
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaqs.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Category Header */}
              <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-red-50 rounded-lg text-red-500">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.category}
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  {category.questions.length} articles
                </p>
              </div>

              {/* Questions */}
              <div className="divide-y divide-gray-100">
                {category.questions.slice(0, 3).map((faq, questionIndex) => {
                  const isOpen = openFaqs[`${categoryIndex}-${questionIndex}`];
                  return (
                    <div key={questionIndex} className="p-4">
                      <button
                        onClick={() => toggleFaq(categoryIndex, questionIndex)}
                        className="w-full flex items-start justify-between gap-4 text-left"
                      >
                        <span className="text-sm font-medium text-gray-700 flex-1">
                          {faq.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp size={18} className="text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {category.questions.length > 3 && (
                  <button className="w-full p-4 text-sm text-red-500 hover:text-red-600 font-medium flex items-center justify-center gap-2 hover:bg-red-50 transition">
                    View {category.questions.length - 3} more articles
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still need help?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our support team is available 24/7 to assist you with any questions or concerns
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className={`w-14 h-14 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {method.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {method.title}
                </h3>
                
                <p className="text-gray-600 mb-6 text-sm">
                  {method.description}
                </p>
                
                {method.title === "Live Chat" ? (
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 group">
                    Start Chat
                    <MessageCircle size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <p className="text-sm font-medium text-gray-900">
                    {method.action}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Clock />, label: "Avg. Response", value: "< 5 mins" },
              { icon: <Users />, label: "Happy Tenants", value: "10K+" },
              { icon: <CheckCircle />, label: "Issues Resolved", value: "98%" },
              { icon: <Star />, label: "Support Rating", value: "4.9/5" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 rounded-xl text-red-500 mb-3">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Emergency Notice */}
          <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle size={20} className="text-yellow-600" />
              </div>
              <div>
                <h4 className="font-semibold text-yellow-800 mb-1">Emergency Assistance</h4>
                <p className="text-yellow-700 text-sm">
                  For urgent issues during your stay (lockouts, safety concerns, etc.), 
                  please call our 24/7 emergency line: <span className="font-bold">+90 (123) 456-7890</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}