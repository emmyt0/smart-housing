"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bot,
  X,
  Home,
  MapPin,
  DollarSign,
} from "lucide-react";

import Link from "next/link";

/* ================= TYPES ================= */

type OptionType =
  | "budget"
  | "apartment"
  | "location";

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

const BUDGET_RANGES: OptionItem[] = [
  {
    id: "low",
    name: "$1k - $3k",
    icon: "💵",
  },
  {
    id: "medium",
    name: "$3k - $6k",
    icon: "💰",
  },
  {
    id: "high",
    name: "$6k - $10k",
    icon: "🏦",
  },
];

const APARTMENT_TYPES: OptionItem[] = [
  {
    id: "studio",
    name: "Studio (1+0)",
    icon: "🪑",
  },
  {
    id: "1+1",
    name: "1+1 Apartment",
    icon: "🛋️",
  },
  {
    id: "2+1",
    name: "2+1 Apartment",
    icon: "🏠",
  },
  {
    id: "3+1",
    name: "3+1 Apartment",
    icon: "🏢",
  },
  {
    id: "single-room",
    name: "Single Room",
    icon: "🛏️",
  },
];

const LOCATIONS: OptionItem[] = [
  {
    id: "yesilyurt",
    name: "Yeşilyurt",
    icon: "🌿",
  },
  {
    id: "lefke-merkezi",
    name: "Lefke Merkezi",
    icon: "🏛️",
  },
  {
    id: "doganci",
    name: "Doğancı",
    icon: "🏡",
  },
  {
    id: "yedidalga",
    name: "Yedidalga",
    icon: "🌊",
  },
  {
    id: "gemikonagi",
    name: "Gemikonagi",
    icon: "🏘️",
  },
];

/* ================= INITIAL CHAT ================= */

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    text: "👋 Hi! First choose your budget.",
    sender: "bot",
    options: {
      type: "budget",
      items: BUDGET_RANGES,
    },
  },
];

/* ================= COMPONENT ================= */

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const [matches, setMatches] = useState<any[]>([]);

  const [selected, setSelected] = useState<{
    budget?: string;
    apartment?: string;
    location?: string;
  }>({});

  const [messages, setMessages] =
    useState<Message[]>(INITIAL_MESSAGES);

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  /* ================= RESET ================= */

  const resetChat = () => {
    setSelected({});
    setMatches([]);
    setMessages(INITIAL_MESSAGES);
  };

  /* ================= MATCH API ================= */

  const getMatches = async (
    budget: string,
    apartmentType: string,
    location: string
  ) => {
    try {
      const res = await fetch("/api/matches", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          budget,
          apartmentType,
          location,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMatches(data.properties);

        localStorage.setItem(
          "matches",
          JSON.stringify(data.properties)
        );

        /* ================= MATCH FOUND ================= */

        if (data.properties.length > 0) {
          const botMsg: Message = {
            id: Date.now().toString(),
            text: `✨ I found ${data.properties.length} amazing matches for you.`,
            sender: "bot",
          };

          setMessages((prev) => [
            ...prev,
            botMsg,
          ]);
        }

        /* ================= NO MATCH ================= */

        else {
          setMatches([]);

          const noMatchMessage: Message = {
            id: Date.now().toString(),
            text:
              "😔 We couldn't find any properties matching your preferences. Let's try again with different options below.",
            sender: "bot",
          };

          const restartMessage: Message = {
            id: (
              Date.now() + 1
            ).toString(),
            text:
              "👋 First choose your budget.",
            sender: "bot",

            options: {
              type: "budget",
              items: BUDGET_RANGES,
            },
          };

          setSelected({});

          setMessages((prev) => [
            ...prev,
            noMatchMessage,
            restartMessage,
          ]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= HANDLE ================= */

  const handleOptionSelect = async (
    type: OptionType,
    item: OptionItem
  ) => {
    const updated = {
      ...selected,
      [type]: item.id,
    };

    setSelected(updated);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: item.name,
      sender: "user",
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    let botMessage: Message;

    /* ================= FLOW ================= */

    if (type === "budget") {
      botMessage = {
        id: (
          Date.now() + 1
        ).toString(),

        text:
          "Perfect. What apartment type do you want?",

        sender: "bot",

        options: {
          type: "apartment",
          items: APARTMENT_TYPES,
        },
      };
    } else if (type === "apartment") {
      botMessage = {
        id: (
          Date.now() + 1
        ).toString(),

        text:
          "Great. Which location do you prefer?",

        sender: "bot",

        options: {
          type: "location",
          items: LOCATIONS,
        },
      };
    } else {
      botMessage = {
        id: (
          Date.now() + 1
        ).toString(),

        text:
          "🔎 Searching for the best properties...",

        sender: "bot",
      };

      getMatches(
        updated.budget!,
        updated.apartment!,
        item.id
      );
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        botMessage,
      ]);
    }, 400);
  };

  /* ================= UI ================= */

  return (
    <>
      {/* BUTTON */}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center shadow-lg"
        >
          <Bot
            className="text-white"
            size={26}
          />
        </button>
      )}

      {/* OVERLAY */}

      {isOpen && (
        <div
          onClick={() => {
            setIsOpen(false);
            resetChat();
          }}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        />
      )}

      {/* CHAT */}

      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] h-[530px] transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-2xl border overflow-hidden">
          
          {/* HEADER */}

          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <div className="bg-red-100 p-2 rounded-lg">
                <Bot
                  className="text-red-500"
                  size={20}
                />
              </div>

              <span className="font-semibold text-sm">
                Smart Assistant
              </span>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                resetChat();
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* MESSAGES */}

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.sender === "user"
                    ? "justify-end"
                    : "justify-start"
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
                      {m.options.items.map(
                        (item) => (
                          <button
                            key={item.id}
                            onClick={() =>
                              handleOptionSelect(
                                m.options!.type,
                                item
                              )
                            }
                            className="text-xs px-3 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition flex items-center gap-1"
                          >
                            <span>
                              {item.icon}
                            </span>

                            {item.name}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* MATCHES BUTTON */}

          {matches.length > 0 && (
            <div className="p-3 border-t bg-white">
              <Link
                href="/matches"
                onClick={() => {
                  setIsOpen(false);
                  resetChat();
                }}
                className="block w-full text-center bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition"
              >
                View {matches.length} Matches →
              </Link>
            </div>
          )}

          {/* PREFERENCES */}

          <div className="px-3 pb-3 flex flex-wrap gap-1">
            {selected.budget && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg flex items-center gap-1">
                <DollarSign size={12} />

                {
                  BUDGET_RANGES.find(
                    (b) =>
                      b.id ===
                      selected.budget
                  )?.name
                }
              </span>
            )}

            {selected.apartment && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg flex items-center gap-1">
                <Home size={12} />

                {
                  APARTMENT_TYPES.find(
                    (a) =>
                      a.id ===
                      selected.apartment
                  )?.name
                }
              </span>
            )}

            {selected.location && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg flex items-center gap-1">
                <MapPin size={12} />

                {
                  LOCATIONS.find(
                    (l) =>
                      l.id ===
                      selected.location
                  )?.name
                }
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}