"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Send, Loader2 } from "lucide-react";

export function ContactForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    try {
      const data = new FormData(form);
      const endpoint = "https://formsubmit.co/ajax/nikhilsunny35@gmail.com";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error("Failed to send");
      setSent(true);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Please try again or email directly.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <label className="text-xs font-mono font-medium text-[#A3A3A3] uppercase tracking-wider block mb-1.5">
          Name
        </label>
        <Input
          name="name"
          required
          placeholder="Jane Doe"
          className="h-11 rounded-xl bg-white/[0.03] border-white/10 text-white placeholder:text-[#A3A3A3]/40 focus:border-[#FF8A3D]/60 focus:ring-1 focus:ring-[#FF8A3D]/40 transition-all text-sm"
        />
      </div>

      <div className="sm:col-span-1">
        <label className="text-xs font-mono font-medium text-[#A3A3A3] uppercase tracking-wider block mb-1.5">
          Email
        </label>
        <Input
          name="email"
          required
          type="email"
          placeholder="jane@company.com"
          className="h-11 rounded-xl bg-white/[0.03] border-white/10 text-white placeholder:text-[#A3A3A3]/40 focus:border-[#FF8A3D]/60 focus:ring-1 focus:ring-[#FF8A3D]/40 transition-all text-sm"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="text-xs font-mono font-medium text-[#A3A3A3] uppercase tracking-wider block mb-1.5">
          Message
        </label>
        <Textarea
          name="message"
          required
          rows={4}
          placeholder="Discuss an architecture, project, or role..."
          className="rounded-xl bg-white/[0.03] border-white/10 text-white placeholder:text-[#A3A3A3]/40 focus:border-[#FF8A3D]/60 focus:ring-1 focus:ring-[#FF8A3D]/40 transition-all text-sm resize-none"
        />
      </div>

      <input type="hidden" name="_captcha" value="false" />

      <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-xs font-mono text-[#FF8A3D] bg-[#FF8A3D]/10 border border-[#FF8A3D]/30 px-4 py-2.5 rounded-full"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Transmission dispatched successfully.</span>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button
                type="submit"
                disabled={sending}
                className="w-full sm:w-auto h-11 px-6 rounded-full bg-[#FF8A3D] text-[#050505] hover:bg-[#ff964f] font-semibold text-xs tracking-wider uppercase font-mono shadow-[0_0_20px_rgba(255,138,61,0.2)] transition-all"
              >
                {sending ? (
                  <>
                    <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                    Transmitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-3.5 w-3.5" />
                    Send Transmission
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="text-[11px] font-mono text-[#A3A3A3]/70">
          Response within 24 hours
        </div>
      </div>
    </form>
  );
}
