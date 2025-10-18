"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    try {
      const data = new FormData(form);
      // Using FormSubmit as backendless email handler
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
      alert("Failed to send message. Please try again later.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-1">
        <label className="text-sm">Name</label>
        <Input name="name" required placeholder="Your name" className="mt-1" />
      </div>
      <div className="md:col-span-1">
        <label className="text-sm">Email</label>
        <Input
          name="email"
          required
          type="email"
          placeholder="you@example.com"
          className="mt-1"
        />
      </div>
      <div className="md:col-span-2">
        <label className="text-sm">Message</label>
        <Textarea name="message" required placeholder="How can I help?" className="mt-1" />
      </div>
      <input type="hidden" name="_captcha" value="false" />
      <div className="md:col-span-2 flex items-center gap-3">
        <Button type="submit" disabled={sending}>
          {sending ? "Sending…" : sent ? "Sent!" : "Send Message"}
        </Button>
        <div className="text-xs text-muted-foreground">I will get back within 24 hours.</div>
      </div>
    </form>
  );
}
