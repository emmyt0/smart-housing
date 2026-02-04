'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

type SidebarProps = {
  activePage: string;
  setActivePage: (page: string) => void;
};

export function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: '🏠' },
    { name: 'Create Listing', icon: '📊' },
    { name: 'My Listings', icon: '📋' },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed lg:hidden z-50 top-4 left-4 p-2 bg-dark rounded-lg"
      >
        {isOpen ? <X className="text-surface" /> : <Menu className="text-surface" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-dark transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="h-full px-4 py-6">
          <h2 className="text-2xl font-bold text-accent mb-8">
            Smart Housing
          </h2>

          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      setActivePage(item.name);
                      setIsOpen(false); // close sidebar on mobile
                    }}
                    className={`flex w-full items-center p-3 rounded-lg transition-colors
                      ${
                        activePage === item.name
                          ? 'bg-primary text-white'
                          : 'text-surface hover:bg-primary'
                      }
                    `}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
