import Link from "next/link";
import { ExternalLink } from "lucide-react";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export default function SocialLinks() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-2xl font-bold gradient-text mb-2">Follow the Magic</h2>
        <p className="text-purple-300/70 text-sm mb-8">
          Stay up to date with new arrivals, behind-the-scenes and crystal wisdom.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://www.facebook.com/share/1AfqbUBz54/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1a0f2e]/60 border border-purple-900/40 text-purple-200 hover:border-purple-500 hover:text-white transition text-sm"
          >
            <FacebookIcon /> Facebook <ExternalLink size={12} className="opacity-50" />
          </a>
          <a
            href="https://www.instagram.com/crystalgoddesscreations1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1a0f2e]/60 border border-purple-900/40 text-purple-200 hover:border-purple-500 hover:text-white transition text-sm"
          >
            <InstagramIcon /> Instagram <ExternalLink size={12} className="opacity-50" />
          </a>
          <a
            href="https://www.tiktok.com/@crystal.goddess.c5"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1a0f2e]/60 border border-purple-900/40 text-purple-200 hover:border-purple-500 hover:text-white transition text-sm"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.21 8.21 0 004.79 1.52V6.76a4.85 4.85 0 01-1.02-.07z" />
            </svg>
            TikTok <ExternalLink size={12} className="opacity-50" />
          </a>
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-800/30">
          <p className="text-purple-200 font-medium mb-5">✉️ Questions? Get in touch</p>
          <div className="flex justify-center gap-5 mb-5">
            <a
              href="https://www.instagram.com/crystalgoddesscreations1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex flex-col items-center gap-1.5 group"
            >
              <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1a0f2e]/60 border border-purple-700/50 group-hover:border-pink-400 group-hover:scale-105 transition text-white">
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
              <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1a0f2e]/60 border border-purple-700/50 group-hover:border-blue-400 group-hover:scale-105 transition text-white">
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
              <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1a0f2e]/60 border border-purple-700/50 group-hover:border-pink-400 group-hover:scale-105 transition text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 7 10-7" />
                </svg>
              </span>
              <span className="text-xs text-purple-300/70 group-hover:text-white transition">Email</span>
            </a>
          </div>
          <Link
            href="/contact"
            className="inline-block px-6 py-2.5 rounded-xl border border-purple-600/60 hover:border-purple-400 text-purple-200 hover:text-white text-sm transition"
          >
            Send a Message
          </Link>
        </div>
      </div>
    </section>
  );
}
