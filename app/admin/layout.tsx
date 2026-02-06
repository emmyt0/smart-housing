"use client";

import { useState } from "react";
import AdminBar from "../components/AdminBar";
import CreateListing from "../components/CreateListing";
import PropertyListing from "../components/PropertyListing";
import { Home, DollarSign, TrendingUp } from "lucide-react";

export default function AdminLayout() {
  const [activeContent, setActiveContent] = useState("Dashboard");

  const renderContent = () => {
    switch (activeContent) {
      case "Dashboard":
        return (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold">Dashboard Overview</h1>
                <p className="mt-2 text-gray-600">
                  Welcome back! Here's what's happening with your properties today.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                  View Report
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Property Card */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Home className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <TrendingUp className="w-4 h-4 inline mr-1" />
                    +20%
                  </span>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">Total Property</h3>
                <p className="text-3xl font-bold mt-2">1,600</p>
                <p className="text-gray-400 text-sm mt-2">~20% from last month</p>
              </div>

              {/* Number of Sales Card */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <TrendingUp className="w-4 h-4 inline mr-1" />
                    +20%
                  </span>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">Number of Sales</h3>
                <p className="text-3xl font-bold mt-2">410</p>
                <p className="text-gray-400 text-sm mt-2">~20% from last month</p>
              </div>

              {/* Total Earnings Card */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <TrendingUp className="w-4 h-4 inline mr-1" />
                    +20%
                  </span>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">Total Earnings</h3>
                <p className="text-3xl font-bold mt-2">$160k</p>
                <p className="text-gray-400 text-sm mt-2">~20% from last month</p>
              </div>
            </div>

            {/* Welcome Message Section */}
            <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800">Welcome to smart-housing</h2>
              <p className="mt-2 text-gray-600">
                Your property management dashboard is designed to help you streamline operations, 
                track performance, and grow your real estate portfolio. Monitor key metrics, 
                manage listings, and make data-driven decisions all in one place.
              </p>
              <div className="mt-4 flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-500">
                  Last updated: Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

           
          </>
        );

      case "Manage Property":
        return (
          <>
            <CreateListing />
          </>
        );

      case "Property Listings":
        return (
          <>
            <PropertyListing />
          </>
        );

      default:
        return (
          <>
            <h1 className="text-3xl font-medium">DASHBOARD</h1>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <AdminBar onMenuClick={setActiveContent} />

      {/* Main content */}
      <main className="flex-1 p-6 lg:ml-3">
        {renderContent()}
      </main>
    </div>
  );
}