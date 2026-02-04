"use client";

import { useState } from "react";
import AdminBar from "../components/AdminBar";
import CreateListing from "../components/CreateListing";

export default function AdminLayout() {
  const [activeContent, setActiveContent] = useState("Dashboard");

  const renderContent = () => {
    switch (activeContent) {
      case "Dashboard":
        return (
          <>
            <h1 className="text-3xl font-medium">DASHBOARD</h1>
            <p className="mt-2 text-teal-400 text-sm">
              Welcome to your admin dashboard
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Total Users</h3>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Total Revenue</h3>
                <p className="text-2xl font-bold">$45,678</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Active Sessions</h3>
                <p className="text-2xl font-bold">89</p>
              </div>
            </div>
          </>
        );

      case "Manage Users":
        return (
          <>
            <CreateListing />
          </>
        );

      case "Withdraws":
        return (
           <> 
             <CreateListing />
          
          </>
        );

      case "Referrals":
        return ( <> <h1 className="text-3xl font-medium">USER REFERRALS</h1>;
          
            <h1 className="text-3xl font-medium">USER REFERRALS</h1>
          </>
        );

      case "Approvals":
        return (
          <>
            <h1 className="text-3xl font-medium">UPDATE USERS</h1>
          </>
        );

      case "Profits":
        return (
          <>
            <h1 className="text-3xl font-medium">UPDATE PROFITS</h1>
          </>
        );

      case "All transactions":
        return (
          <>
            <h1 className="text-3xl font-medium">ALL TRANSACTIONS</h1>
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
      <main className="flex-1 p-3  lg:ml-3">
        {renderContent()}
      </main>
    </div>
  );
}
