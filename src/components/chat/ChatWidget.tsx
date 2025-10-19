"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function TypingDots() {
  return (
    <div className="flex items-center gap-1">
      <span className="h-2 w-2 rounded-full bg-muted-foreground/70 animate-bounce [animation-delay:-0.2s]"></span>
      <span className="h-2 w-2 rounded-full bg-muted-foreground/70 animate-bounce [animation-delay:-0.1s]"></span>
      <span className="h-2 w-2 rounded-full bg-muted-foreground/70 animate-bounce"></span>
    </div>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      // Seed a friendly greeting once when opening without duplicating
      if (messages.length === 0) {
        setMessages([
          {
            role: "assistant",
            content:
              "Hi! I’m Nikhil’s AI assistant. Ask me about skills, projects, or experience.",
          },
        ]);
      }
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            // project prompt is injected at server; forward relevant context
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: text },
          ],
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = (await res.json()) as { message?: ChatMessage };
      if (data?.message) {
        setMessages((prev) => [...prev, data.message!]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I ran into a problem. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating bubble */}
      <button
        aria-label="Open chat"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg focus:outline-none",
          "transition-transform duration-300 ease-out",
          !open && "animate-[pulse_2.2s_ease-in-out_infinite]"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6 m-auto"
        >
          <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
        </svg>
      </button>

      {/* Chat window */}
      <div
        className={cn(
          "absolute bottom-16 right-0 w-[min(92vw,380px)] overflow-hidden rounded-xl border",
          "backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/80",
          "shadow-2xl transition-all duration-300",
          open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"
        )}
      >
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <div className="font-medium">Chat with Nikhil's AI</div>
          <button
            aria-label="Close chat"
            onClick={() => setOpen(false)}
            className="rounded p-1 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 111.414 1.414L13.414 10.586l4.361 4.361a1 1 0 01-1.414 1.414L12 12l-4.361 4.361a1 1 0 01-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div ref={scrollRef} className="max-h-[50vh] overflow-y-auto p-4 space-y-3">
          {messages.map((m, idx) => (
            <div key={idx} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}> 
              <div
                className={cn(
                  "px-3 py-2 rounded-2xl text-sm max-w-[80%]",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-secondary text-secondary-foreground rounded-bl-sm"
                )}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-3 py-2 rounded-2xl bg-secondary text-secondary-foreground rounded-bl-sm">
                <TypingDots />
              </div>
            </div>
          )}
        </div>
        <div className="border-t p-3">
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about skills, projects, experience..."
              rows={2}
            />
            <Button onClick={handleSend} disabled={loading || !input.trim()}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
