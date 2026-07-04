import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, AlertCircle, RefreshCw, Compass, Hotel, Calendar, Utensils, HelpCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

const PLAYBOOK_PROMPTS = [
  {
    id: "attractions",
    label: "🗺️ Top Sights & Fees",
    text: "Can you list the top attractions in Bislig, including their entrance fees and how to get to them?"
  },
  {
    id: "accommodations",
    label: "🏨 Best Places to Stay",
    text: "What are the recommended accommodations or eco-resorts in Bislig and nearby Hinatuan?"
  },
  {
    id: "events",
    label: "🦀 Cultural Festivals",
    text: "What cultural festivals and eco-sports events happen in Bislig City?"
  },
  {
    id: "dining",
    label: "☕ Dining & Cafes",
    text: "Where are the best seafood restaurants and specialty cafes in Bislig proper?"
  },
  {
    id: "itinerary",
    label: "🎒 3-Day Itinerary Idea",
    text: "Suggest a relaxing 3-day eco-adventure itinerary for chasing waterfalls and springs."
  },
  {
    id: "travel",
    label: "🚗 How to Get Here",
    text: "What is the best way to travel to Bislig City from Davao or Butuan?"
  }
];

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "bot",
      text: "Ayu-ayu! Welcome to Bislig City Tourism! 🌴 I'm Romeo, here to help you discover the best of Bislig.\n\nI have complete local knowledge of our pristine waterfalls, deep sapphire spring rivers, beach resorts, dining gems, and Kamayo heritage.\n\nHow can I help you plan your dream adventure today? Or select one of the quick tourism guide playbooks below!",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setError(null);
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            sender: m.sender,
            text: m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Unable to establish communication with the AI server.");
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: `msg-${Date.now()}-bot`,
        sender: "bot",
        text: data.reply || "I am here to guide you, but I received an empty response. Let me know what else you would like to ask!",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error("Chatbot submit error:", err);
      setError("We encountered a small connection issue. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "initial",
        sender: "bot",
        text: "Ayu-ayu! Welcome to Bislig City Tourism! 🌴 I'm Romeo, here to help you discover the best of Bislig.\n\nHow can I help you plan your dream adventure today? Choose a playbook below to start!",
        timestamp: new Date()
      }
    ]);
    setError(null);
  };

  // Simple Markdown formatter to support bold (**), bullet points, and newlines beautifully
  const renderMessageText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      // Bold formatter
      let parts = [];
      let regex = /\*\*(.*?)\*\*/g;
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={match.index} className="font-extrabold text-[#0047A1] bg-[#E0F2FE]/40 px-1 rounded-sm">
            {match[1]}
          </strong>
        );
        lastIndex = regex.lastIndex;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      // Check for bullet list format
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        return (
          <li key={index} className="ml-4 list-disc text-xs text-slate-700 leading-relaxed mb-1">
            {parts.length > 0 ? parts : line.trim().substring(2)}
          </li>
        );
      }

      return (
        <p key={index} className="text-xs text-slate-700 leading-relaxed mb-1.5">
          {parts.length > 0 ? parts : line}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Chat Bubble Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className={`relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
            isOpen
              ? "bg-[#0047A1] text-white rotate-90"
              : "bg-gradient-to-tr from-[#0047A1] to-[#0ea5e9] text-white hover:shadow-cyan-200/50 hover:shadow-xl"
          }`}
          title="Chat with AI Concierge"
          id="chatbot-toggle-button"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <MessageSquare className="w-6 h-6" />
              {/* Animated notification pulse marker */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
            </div>
          )}
        </button>
      </div>

      {/* Expandable Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 md:right-6 z-50 w-[92vw] sm:w-[410px] h-[550px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            id="chatbot-window"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#0047A1] to-[#0047A1] text-white flex items-center justify-between shadow">
              <div className="flex items-center gap-3">
                {/* Custom AI Avatar design with subtle sparkle animation */}
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center relative">
                  <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0047A1]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-wide font-serif">Romeo</h3>
                  <p className="text-[10px] text-[#A5F3FC] font-semibold uppercase tracking-widest flex items-center gap-1">
                    <span>● Online</span>
                    <span>•</span>
                    <span>Official Guide</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition"
                  title="Clear conversation"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 custom-scrollbar">
              {messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 max-w-[85%] ${
                      isBot ? "" : "ml-auto flex-row-reverse"
                    }`}
                  >
                    {/* Tiny Avatar */}
                    <div
                      className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold ${
                        isBot
                          ? "bg-sky-100 text-sky-800 border border-sky-200"
                          : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      {isBot ? "🤖" : "👤"}
                    </div>

                    {/* Bubble Content */}
                    <div className="space-y-1">
                      <div
                        className={`p-3 rounded-2xl shadow-sm border ${
                          isBot
                            ? "bg-white border-slate-100 rounded-tl-none"
                            : "bg-[#0047A1] text-white border-blue-600 rounded-tr-none"
                        }`}
                      >
                        {isBot ? (
                          <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                            {renderMessageText(msg.text)}
                          </div>
                        ) : (
                          <p className="text-xs text-white leading-relaxed">{msg.text}</p>
                        )}
                      </div>
                      <span className={`text-[9px] text-slate-400 block px-1 ${!isBot && "text-right"}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Bot thinking state */}
              {isLoading && (
                <div className="flex items-start gap-2.5 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center text-[10px]">
                    🤖
                  </div>
                  <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5 py-4 px-5">
                    <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              {/* Error warning badge */}
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Message failed to send</p>
                    <p className="text-[11px] text-rose-600 mt-0.5">{error}</p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Playbook Quick Chips selection panel */}
            <div className="px-4 py-2 border-t border-slate-100 bg-white">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#0047A1]" />
                <span>Travel Guide Playbooks</span>
              </p>
              <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-200">
                {PLAYBOOK_PROMPTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSendMessage(p.text)}
                    disabled={isLoading}
                    className="shrink-0 text-[10px] font-semibold bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-[#0047A1] border border-slate-200 rounded-full px-3 py-1 transition-all disabled:opacity-50"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 bg-slate-50 border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about waterfalls, resorts, food..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isLoading}
                className="flex-grow bg-white border border-slate-200 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#0047A1] focus:ring-1 focus:ring-sky-100 transition disabled:opacity-75"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="p-2.5 bg-[#0047A1] hover:bg-[#0047A1] text-white rounded-xl shadow transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
