"use client";

import React, { useState } from "react";
import {
  Users,
  X,
  Home,
  Menu,
  LogOut,
  HandCoins,
} from "lucide-react";
import { signOut } from "next-auth/react";

type AdminBarProps = {
  onMenuClick: (menu: string) => void;
};

type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  category?: string;
};

const AdminBar = ({ onMenuClick }: AdminBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    onMenuClick(menu);
    setIsOpen(false); // close sidebar on mobile
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const menuItems: MenuItem[] = [
    {
      id: "Dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5 text-[#4C528C]" />,
    },
    {
      id: "Manage Property",
      label: "Manage property",
      icon: <Users className="h-5 w-5 text-gray-400" />,
      category: "Data",
    },
    {
      id: "Property Listings",
      label: "Property Listings",
      icon: <HandCoins className="h-5 w-5 text-gray-400" />,
    },
    
  ];

  return (
    <div className="min-h-screen flex ">
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72
          bg-black text-white
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Close button (mobile only) */}
        <div className="flex justify-end p-4 lg:hidden">
          <button onClick={toggleSidebar} aria-label="Close sidebar">
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Logo + Admin */}
        <div className="flex flex-col items-center mb-8">
          <span className="text-red-600 py-4 ">
              <p className=" text-2xl  font-bold"> lefke-aprtments</p>
              
            </span>
        </div>

        {/* Menu */}
        <nav className="px-4 space-y-1">
          {menuItems.map((item, index) => (
            <React.Fragment key={item.id}>
              {item.category && (
                <p className="text-xs text-gray-400 uppercase mt-4 mb-2">
                  {item.category}
                </p>
              )}

              <button
                onClick={() => handleMenuClick(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-md
                  transition
                  ${
                    activeMenu === item.id
                      ? "bg-white text-black"
                      : "text-gray-300 hover:bg-gray-800"
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </React.Fragment>
          ))}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-md
                       text-gray-300 hover:bg-gray-800 mt-6"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-62 p-2">
        {/* Top bar (mobile only) */}
        <header className="bg-black shadow p-2 flex items-center lg:hidden rounded-md">
          <button onClick={toggleSidebar} aria-label="Open sidebar">
            <Menu className="h-7 w-7 text-white" />
          </button>
        </header>

        {/* Page content */}
        <main className="p-6">
          {/* Your admin content goes here */}
        </main>
      </div>
    </div>
  );
};

export default AdminBar;
