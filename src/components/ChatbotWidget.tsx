"use client";

import { MessageCircle } from "lucide-react";

export default function ChatbotWidget() {
  return (
    <a
      href="https://api.whatsapp.com/send/?phone=918104697547&text=%23snowsense&type=phone_number&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Snowcem on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-auto w-14 h-14 rounded-full bg-emerald-500 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 hover:bg-emerald-600"
    >
      <MessageCircle className="w-7 h-7 fill-white" />
    </a>
  );
}
