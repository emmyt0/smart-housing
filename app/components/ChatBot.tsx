"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot } from "lucide-react";

const BUDGETS = [
  {
    id: "low",
    name: "$1k - $3k",
  },
  {
    id: "medium",
    name: "$3k - $6k",
  },
  {
    id: "high",
    name: "$6k - $10k",
  },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const [matches, setMatches] = useState<any[]>([]);

  const handleBudget = async (budget: string) => {
    try {
      const res = await fetch("/api/matches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget,
        }),
      });

      const data = await res.json();

      console.log(data);

      if (data.success) {
        setMatches(data.properties);

        localStorage.setItem(
          "matches",
          JSON.stringify(data.properties)
        );
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-red-500 text-white w-14 h-14 rounded-full"
        >
          <Bot className="mx-auto" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[380px] bg-white rounded-2xl shadow-2xl border z-50 p-5">
          
          <h2 className="text-xl font-bold mb-4">
            Smart Property Assistant
          </h2>

          <p className="text-sm text-gray-500 mb-4">
            Select your budget
          </p>

          <div className="space-y-2">
            {BUDGETS.map((budget) => (
              <button
                key={budget.id}
                onClick={() => handleBudget(budget.id)}
                className="w-full bg-gray-100 hover:bg-gray-200 rounded-xl px-4 py-3 text-left"
              >
                {budget.name}
              </button>
            ))}
          </div>

          {matches.length > 0 && (
            <div className="mt-5">
              
              <p className="text-sm font-semibold mb-2">
                Found {matches.length} matches
              </p>

              <Link
                href="/matches"
                className="block text-center bg-red-500 text-white py-3 rounded-xl"
              >
                View Matches
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}