"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, RotateCcw, Sparkles, User, MessageSquare } from "lucide-react";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content: "Hi! I'm Nikhil's AI Assistant. Ask me anything about his production experience, RAG pipelines, system architecture, or tech stack.",
};

const SUGGESTION_CHIPS = [
  "⚡ AI & RAG Projects",
  "💼 Work Experience",
  "🛠️ Tech Stack",
  "📫 Contact Details",
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white/[0.03] w-fit">
      <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDuration: '1.4s', animationDelay: '0s' }} />
      <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDuration: '1.4s', animationDelay: '0.2s' }} />
      <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDuration: '1.4s', animationDelay: '0.4s' }} />
    </div>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading, open]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  const sendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || loading) return;

    setInput("");
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      if (data?.message?.content) {
        setMessages((prev) => [...prev, data.message]);
      } else {
        throw new Error("No message returned");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Nikhil is a Full Stack & AI Engineer with 3.3+ years experience across RAG, Node.js, React, and AWS. You can also contact him directly at nikhilsunny35@gmail.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => sendMessage(input);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Floating Trigger Button (Clean, NO blinking pulse) */}
      <motion.button
        aria-label={open ? "Close chat" : "Open AI Assistant"}
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative flex items-center gap-2.5 px-3.5 sm:px-4 h-11 sm:h-12 rounded-full border shadow-2xl transition-all duration-300",
          open
            ? "bg-muted/80 text-foreground border-white/20"
            : "bg-[#090b10]/90 hover:bg-[#0f131c] text-white border-white/15 hover:border-primary/50 backdrop-blur-xl"
        )}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
        </span>
        {open ? (
          <X className="h-4 w-4" />
        ) : (
          <>
            <Bot className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold tracking-wide">Ask AI</span>
          </>
        )}
      </motion.button>

      {/* Chat Window with Framer Motion spring transition */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.8 }}
            className="absolute bottom-14 sm:bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-[390px] max-w-[390px] h-[min(520px,78vh)] flex flex-col rounded-2xl border border-white/[0.08] bg-[#090b10]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/[0.04] flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold flex items-center gap-1.5">
                    Nikhil&apos;s AI Assistant
                    <Sparkles className="h-3 w-3 text-primary opacity-80" />
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    ONLINE &bull; READY
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetChat}
                  title="Reset Conversation"
                  className="h-8 w-8 rounded-full text-muted-foreground hover:text-white hover:bg-white/10"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  title="Close"
                  className="h-8 w-8 rounded-full text-muted-foreground hover:text-white hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={cn("flex gap-2.5", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  {m.role === "assistant" && (
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="h-3 w-3 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "px-4 py-3 rounded-2xl text-[13px] sm:text-sm leading-relaxed max-w-[85%] whitespace-pre-line",
                      m.role === "user"
                        ? "bg-primary text-primary-foreground font-medium rounded-br-sm"
                        : "bg-white/[0.04] text-white/90 rounded-bl-sm"
                    )}
                  >
                    {m.content}
                  </div>
                  {m.role === "user" && (
                    <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="h-3 w-3 text-white/70" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="h-3 w-3 text-primary" />
                  </div>
                  <TypingIndicator />
                </div>
              )}
            </div>

            {/* Suggestion Starter Chips (Visible on start or when short history) */}
            {messages.length <= 2 && !loading && (
              <div className="px-4 py-3 flex flex-wrap gap-2 border-t border-white/[0.04] bg-black/10">
                {SUGGESTION_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => sendMessage(chip.replace(/^[^\s]+\s/, ""))}
                    className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-muted-foreground hover:text-white transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 border-t border-white/[0.04] bg-black/20">
              <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/10 px-3 py-1.5 focus-within:border-primary/50 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about skills, projects, RAG..."
                  className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder:text-muted-foreground/60 focus:outline-none"
                  disabled={loading}
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="h-7 w-7 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 transition-opacity"
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="text-[10px] text-muted-foreground/50 text-center mt-1.5 font-mono">
                Press Enter ↵ to send
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
