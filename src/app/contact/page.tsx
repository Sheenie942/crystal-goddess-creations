"use client";

import { useState } from "react";
import type { Metadata } from "next";

// Note: metadata won't work in a client component — moved to a server wrapper
export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          description: form.message,
          budget: "",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4 select-none">💌</div>
        <h1 className="font-serif text-4xl font-bold gradient-text mb-2">Contact Us</h1>
        <p className="text-purple-300/70">I&apos;d love to hear from you.</p>
        <hr className="divider-glow mt-6" />
      </div>

      {status === "success" ? (
        <div className="text-center py-10">
          <div className="text-4xl mb-4">✨</div>
          <h2 className="font-serif text-2xl font-bold text-purple-100 mb-2">Message Sent!</h2>
          <p className="text-purple-300/70">We&apos;ll get back to you as soon as possible.</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 px-6 py-2.5 rounded-xl border border-purple-600/60 hover:border-purple-400 text-purple-200 hover:text-white transition text-sm"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-purple-300 mb-1.5 font-medium">Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[#1a0f2e]/60 border border-purple-800/50 rounded-xl px-4 py-3 text-purple-100 placeholder-purple-500/50 focus:outline-none focus:border-purple-500 transition text-sm"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm text-purple-300 mb-1.5 font-medium">Email *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-[#1a0f2e]/60 border border-purple-800/50 rounded-xl px-4 py-3 text-purple-100 placeholder-purple-500/50 focus:outline-none focus:border-purple-500 transition text-sm"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm text-purple-300 mb-1.5 font-medium">Message *</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-[#1a0f2e]/60 border border-purple-800/50 rounded-xl px-4 py-3 text-purple-100 placeholder-purple-500/50 focus:outline-none focus:border-purple-500 transition text-sm resize-none"
              placeholder="How can I help?"
            />
          </div>

          {errorMsg && (
            <p className="text-red-400 text-sm bg-red-900/20 border border-red-800/40 rounded-lg px-3 py-2">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition shadow-lg"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}

      <div className="mt-12 pt-8 border-t border-purple-900/30 text-center">
        <p className="text-purple-300/70 text-sm mb-5">Or reach us directly:</p>
        <div className="flex justify-center gap-5">
          <a
            href="https://www.instagram.com/crystalgoddesscreations1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex flex-col items-center gap-1.5 group"
          >
            <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600/40 to-pink-600/40 border border-purple-700/50 group-hover:border-pink-400 group-hover:scale-105 transition text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </span>
            <span className="text-xs text-purple-300/70 group-hover:text-white transition">Instagram</span>
          </a>

          <a
            href="https://m.me/crystalgoddesscreations"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Messenger"
            className="flex flex-col items-center gap-1.5 group"
          >
            <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600/40 to-blue-600/40 border border-purple-700/50 group-hover:border-blue-400 group-hover:scale-105 transition text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.908 1.438 5.504 3.686 7.21V22l3.372-1.851A10.6 10.6 0 0012 20.485c5.523 0 10-4.144 10-9.242C22 6.145 17.523 2 12 2zm1.018 12.443l-2.55-2.72-4.976 2.72 5.474-5.808 2.613 2.72 4.913-2.72-5.474 5.808z" />
              </svg>
            </span>
            <span className="text-xs text-purple-300/70 group-hover:text-white transition">Messenger</span>
          </a>

          <a
            href="mailto:crystalgoddesscreations@gmail.com"
            aria-label="Email"
            className="flex flex-col items-center gap-1.5 group"
          >
            <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-600/40 to-rose-600/40 border border-purple-700/50 group-hover:border-pink-400 group-hover:scale-105 transition text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 7 10-7" />
              </svg>
            </span>
            <span className="text-xs text-purple-300/70 group-hover:text-white transition">Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}
