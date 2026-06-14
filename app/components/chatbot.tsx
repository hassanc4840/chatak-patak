"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Assalam-o-Alaikum! Ready for a Flavor Dhamaka? Ask me anything about our bowls or drinks! 🌶️",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: data.message },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: "Oops, something went wrong on our end! 😅" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] max-w-[calc(100vw-3rem)] rounded-3xl bg-white shadow-2xl border border-charcoal/10 overflow-hidden flex flex-col h-[500px] animate-fade-in">
          {/* Header */}
          <div className="bg-chili px-4 py-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌶️</span>
              <div>
                <h3 className="font-display font-bold leading-none m-0 text-[16px]">Dhamaka Bot</h3>
                <span className="text-xs opacity-80">Always ready for a chat</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-cream/30 flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                  msg.role === "user"
                    ? "bg-charcoal text-cream self-end rounded-tr-sm"
                    : "bg-white border border-charcoal/10 text-charcoal self-start rounded-tl-sm shadow-sm"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white border border-charcoal/10 text-charcoal self-start rounded-2xl rounded-tl-sm px-4 py-2 text-sm shadow-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-mango" /> Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-charcoal/10">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our flavors..."
                className="flex-1 rounded-full border border-charcoal/20 bg-charcoal/5 px-4 py-2 text-sm focus:border-chili focus:outline-none focus:ring-1 focus:ring-chili"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-mango text-charcoal transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
              >
                <Send size={18} className="mr-0.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:-translate-y-1 ${
          isOpen ? "bg-charcoal text-white" : "bg-chili text-white"
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mango opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-mango border-2 border-white"></span>
          </span>
        )}
      </button>
    </div>
  );
}
