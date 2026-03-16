"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Home, MapPin, DollarSign, ArrowRight } from "lucide-react";

const LOCATIONS = [
  { id: "yesilyurt", name: "Yeşilyurt", icon: "🌿" },
  { id: "lefke-merkezi", name: "Lefke Merkezi", icon: "🏛️" },
  { id: "doganci", name: "Doğancı", icon: "🏡" },
  { id: "yedidalga", name: "Yedidalga", icon: "🌊" },
  { id: "gemikonagi", name: "Gemikonagi", icon: "🏘️" }
];

const APARTMENT_TYPES = [
  { id: "studio", name: "Studio (1+0)", icon: "🪑" },
  { id: "1+1", name: "1+1", icon: "🛋️" },
  { id: "2+1", name: "2+1", icon: "🏠" },
  { id: "3+1", name: "3+1", icon: "🏢" },
  { id: "single-room", name: "Single Room", icon: "🛏️" }
];

const BUDGET_RANGES = [
  { id: "low", name: "₺5,000 - ₺10,000", range: [5000, 10000] },
  { id: "medium", name: "₺10,000 - ₺15,000", range: [10000, 15000] },
  { id: "high", name: "₺15,000 - ₺20,000", range: [15000, 20000] },
  { id: "premium", name: "₺20,000+", range: [20000, 999999] }
];

type Message = {
  id: string;
  text: string;
  sender: "bot" | "user";
  options?: {
    type: "location" | "apartment" | "budget";
    items: any[];
  };
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hello! I'm your Lefke Apartments assistant. I can help you find your perfect home! What type of apartment are you looking for?",
      sender: "bot",
      options: {
        type: "apartment",
        items: APARTMENT_TYPES
      }
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState({
    apartmentType: null as string | null,
    location: null as string | null,
    budget: null as string | null
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatRef.current && 
        !chatRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionSelect = (type: "location" | "apartment" | "budget", item: any) => {
    // Update preferences
    setSelectedPreferences(prev => ({
      ...prev,
      [type]: item.id
    }));

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: `Selected: ${item.name}`,
      sender: "user"
    };
    setMessages(prev => [...prev, userMessage]);

    // Determine next question
    let nextMessage: Message;

    if (type === "apartment") {
      nextMessage = {
        id: (Date.now() + 1).toString(),
        text: "Great choice! Now, which location are you interested in?",
        sender: "bot",
        options: {
          type: "location",
          items: LOCATIONS
        }
      };
    } else if (type === "location") {
      nextMessage = {
        id: (Date.now() + 1).toString(),
        text: "Perfect! What's your budget range?",
        sender: "bot",
        options: {
          type: "budget",
          items: BUDGET_RANGES
        }
      };
    } else {
      // All preferences collected
      const apartmentName = APARTMENT_TYPES.find(a => a.id === selectedPreferences.apartmentType)?.name || "apartment";
      const locationName = LOCATIONS.find(l => l.id === selectedPreferences.location)?.name || "your preferred location";
      
      nextMessage = {
        id: (Date.now() + 1).toString(),
        text: `🎉 Fantastic! I've found some great ${apartmentName} options in ${locationName} within your budget. Would you like to see them?`,
        sender: "bot"
      };
    }

    setTimeout(() => {
      setMessages(prev => [...prev, nextMessage]);
    }, 500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user"
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand you're looking for more information. Please select from the options above to help me find the perfect apartment for you!",
        sender: "bot"
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const resetConversation = () => {
    setMessages([
      {
        id: Date.now().toString(),
        text: "👋 Hello! I'm your Lefke Apartments assistant. I can help you find your perfect home! What type of apartment are you looking for?",
        sender: "bot",
        options: {
          type: "apartment",
          items: APARTMENT_TYPES
        }
      }
    ]);
    setSelectedPreferences({
      apartmentType: null,
      location: null,
      budget: null
    });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 group z-40 ${
          isOpen ? "hidden" : "flex"
        } items-center justify-center w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}
      >
        <Bot size={28} className="text-white" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* Chat Window */}
      <div
        ref={chatRef}
        className={`fixed bottom-6 right-6 w-96 h-[600px] z-50 rounded-2xl shadow-2xl transition-all duration-300 transform ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Chat Container */}
        <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Lefke Assistant</h3>
                <p className="text-white/80 text-xs">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetConversation}
                className="text-white/80 hover:text-white transition p-1"
              >
                <ArrowRight size={18} className="rotate-180" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition p-1"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl rounded-tr-none"
                        : "bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-none"
                    } p-3 shadow-sm`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    
                    {/* Options Grid */}
                    {message.options && (
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {message.options.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleOptionSelect(message.options!.type, item)}
                            className={`flex items-center gap-2 p-2 rounded-xl text-xs transition-all duration-300 ${
                              message.sender === "bot"
                                ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                : "bg-white/20 hover:bg-white/30 text-white"
                            }`}
                          >
                            <span>{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-md transition-all duration-300"
              >
                <Send size={18} />
              </button>
            </div>

            {/* Preference Summary */}
            {(selectedPreferences.apartmentType || selectedPreferences.location || selectedPreferences.budget) && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {selectedPreferences.apartmentType && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg text-xs">
                    <Home size={12} />
                    {APARTMENT_TYPES.find(a => a.id === selectedPreferences.apartmentType)?.name}
                  </span>
                )}
                {selectedPreferences.location && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg text-xs">
                    <MapPin size={12} />
                    {LOCATIONS.find(l => l.id === selectedPreferences.location)?.name}
                  </span>
                )}
                {selectedPreferences.budget && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg text-xs">
                    <DollarSign size={12} />
                    {BUDGET_RANGES.find(b => b.id === selectedPreferences.budget)?.name}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}