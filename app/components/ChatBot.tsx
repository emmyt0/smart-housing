"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bot,
  X,
  Send,
  Home,
  MapPin,
  DollarSign
} from "lucide-react";

/* ================= TYPES ================= */

type OptionType = "location" | "apartment" | "budget";

type OptionItem = {
  id: string;
  name: string;
  icon?: string;
};

type Message = {
  id: string;
  text: string;
  sender: "bot" | "user";
  options?: {
    type: OptionType;
    items: OptionItem[];
  };
};

/* ================= DATA ================= */

const LOCATIONS: OptionItem[] = [
  { id: "yesilyurt", name: "Yeşilyurt", icon: "🌿" },
  { id: "lefke-merkezi", name: "Lefke Merkezi", icon: "🏛️" },
  { id: "doganci", name: "Doğancı", icon: "🏡" },
  { id: "yedidalga", name: "Yedidalga", icon: "🌊" },
  { id: "gemikonagi", name: "Gemikonagi", icon: "🏘️" }
];

const APARTMENT_TYPES: OptionItem[] = [
  { id: "studio", name: "Studio (1+0)", icon: "🪑" },
  { id: "1+1", name: "1+1", icon: "🛋️" },
  { id: "2+1", name: "2+1", icon: "🏠" },
  { id: "3+1", name: "3+1", icon: "🏢" },
  { id: "single-room", name: "Single Room", icon: "🛏️" }
];

const BUDGET_RANGES: OptionItem[] = [
  { id: "low", name: "₺5,000 - ₺10,000" },
  { id: "medium", name: "₺10,000 - ₺15,000" },
  { id: "high", name: "₺15,000 - ₺20,000" },
  { id: "premium", name: "₺20,000+" }
];

/* ================= COMPONENT ================= */

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi! I’ll help you find the perfect apartment. What type are you looking for?",
      sender: "bot",
      options: { type: "apartment", items: APARTMENT_TYPES }
    }
  ]);

  const [inputValue, setInputValue] = useState("");

  const [selected, setSelected] = useState<{
    apartment?: string;
    location?: string;
    budget?: string;
  }>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================= HANDLERS ================= */

  const handleOptionSelect = (type: OptionType, item: OptionItem) => {
    setSelected((prev) => ({ ...prev, [type]: item.id }));

    // user message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: item.name,
      sender: "user"
    };

    setMessages((prev) => [...prev, userMsg]);

    let next: Message;

    if (type === "apartment") {
      next = {
        id: (Date.now() + 1).toString(),
        text: "Nice. Which location do you prefer?",
        sender: "bot",
        options: { type: "location", items: LOCATIONS }
      };
    } else if (type === "location") {
      next = {
        id: (Date.now() + 1).toString(),
        text: "Got it. What's your budget?",
        sender: "bot",
        options: { type: "budget", items: BUDGET_RANGES }
      };
    } else {
      next = {
        id: (Date.now() + 1).toString(),
        text: "✨ Perfect. I found some great matches for you.",
        sender: "bot"
      };
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, next]);
    }, 400);
  };

  /* ================= UI ================= */

  return (
    <>
      {/* BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center shadow-lg"
        >
          <Bot className="text-white" size={26} />
        </button>
      )}

      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
        />
      )}

      {/* CHAT */}
      <div
        className={`fixed bottom-6 right-6 z-[100] w-[380px] h-[530px] transition-all duration-300 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-2xl border overflow-hidden">

          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <div className="bg-red-100 p-2 rounded-lg">
                <Bot className="text-red-500" size={20} />
              </div>
              <span className="font-semibold text-sm">Smart Assistant</span>
            </div>

            <button onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] ${
                    m.sender === "user"
                      ? "bg-red-500 text-white rounded-br-none"
                      : "bg-white border rounded-bl-none"
                  }`}
                >
                  {m.text}

                  {m.options && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {m.options.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() =>
                            handleOptionSelect(m.options!.type, item)
                          }
                          className="text-xs px-3 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition flex items-center gap-1"
                        >
                          <span>{item.icon}</span>
                          {item.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="p-3 border-t flex gap-2">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button className="bg-red-500 text-white p-2 rounded-xl">
              <Send size={16} />
            </button>
          </div>

          {/* PREFERENCES */}
          <div className="px-3 pb-3 flex flex-wrap gap-1">
            {selected.apartment && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg flex items-center gap-1">
                <Home size={12} />
                {
                  APARTMENT_TYPES.find((a) => a.id === selected.apartment)?.name
                }
              </span>
            )}
            {selected.location && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg flex items-center gap-1">
                <MapPin size={12} />
                {LOCATIONS.find((l) => l.id === selected.location)?.name}
              </span>
            )}
            {selected.budget && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg flex items-center gap-1">
                <DollarSign size={12} />
                {
                  BUDGET_RANGES.find((b) => b.id === selected.budget)?.name
                }
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}