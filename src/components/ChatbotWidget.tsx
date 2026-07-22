"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "bot",
    text: "Hello! Welcome to Snowcem Paints. How can I assist you today?",
    timestamp: "Just now",
  },
];

const SUGGESTIONS = [
  "Interior emulsion options",
  "Exterior waterproof paints",
  "Find an authorized dealer",
  "Sentino vs Zenita range",
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let replyText =
        "Thank you for reaching out to Snowcem Paints. We offer interior emulsions, exterior weather protection, and iconic waterproof cement paints. Let us know if you need shade cards or dealer locations!";

      const lower = query.toLowerCase();
      if (lower.includes("interior") || lower.includes("sentino") || lower.includes("zenita")) {
        replyText =
          "For interior walls, Snowcem Sentino Premium Acrylic Finish and Zenita Luxury Emulsion offer rich velvet sheen, anti-fungal protection, and 100% washable stain resistance.";
      } else if (lower.includes("exterior") || lower.includes("damp") || lower.includes("waterproof")) {
        replyText =
          "For exterior masonry walls, Snowcem All Guard 100% Acrylic Exterior Emulsion and Snowcem Plus Waterproof Cement Paint offer a 10-year hydrophobic moisture barrier.";
      } else if (lower.includes("dealer") || lower.includes("store") || lower.includes("buy")) {
        replyText =
          "You can find your nearest authorized Snowcem stockist by entering your PIN code in our 'Find Dealer' section in the navbar.";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Indigo & Magenta Circle Launcher Button matching user screenshot */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto w-14 h-14 rounded-full bg-gradient-to-tr from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white shadow-2xl border-2 border-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-indigo-500/50"
          aria-label="Open Chatbot"
        >
          <Bot className="w-7 h-7 text-white drop-shadow-md" />
        </button>
      )}

      {/* Responsive Chat Window with Indigo & Magenta Gradient Theme */}
      {isOpen && (
        <div className="pointer-events-auto w-[calc(100vw-2rem)] sm:w-[360px] h-[440px] sm:h-[480px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden transition-all duration-300">
          
          {/* Header with Indigo & Magenta Gradient */}
          <div className="bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white p-4 flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white tracking-wide">Snowcem Assistant</h3>
                <span className="text-[10px] text-pink-200 font-medium">Online Support</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#2a1b92] to-[#e91e63] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-[#2a1b92] to-[#5c249c] text-white rounded-br-none shadow-md"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-xs"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`text-[9px] mt-1 block text-right font-mono ${
                      msg.sender === "user" ? "text-pink-200" : "text-gray-400"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-gray-500 text-xs pl-1 py-1">
                <Bot className="w-4 h-4 text-[#2a1b92]" />
                <span className="italic">Snowcem Assistant is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2.5 bg-white border-t border-gray-100 flex overflow-x-auto gap-1.5 scrollbar-none shrink-0">
            {SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s)}
                className="whitespace-nowrap text-[10px] font-semibold bg-pink-50 text-[#2a1b92] border border-pink-200 hover:bg-pink-100 px-3 py-1 rounded-full transition-colors shrink-0"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Ask a question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2a1b92]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2a1b92] to-[#e91e63] hover:opacity-90 disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-md shrink-0"
            >
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
