import Link from "next/link";
import { Mail } from "lucide-react";

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

export default function Footer() {
  return (
    <footer className="bg-[#12091f] border-t border-purple-900/40 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <p className="font-serif text-lg font-bold gradient-text mb-2">
            Crystal Goddess Creations
          </p>
          <p className="text-purple-300/70 text-sm leading-relaxed">
            Handcrafted jewellery, crystals, and sacred pieces made with love
            and intention.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <p className="text-purple-200 font-semibold mb-3 text-sm uppercase tracking-widest">
            Quick Links
          </p>
          <ul className="space-y-1.5 text-sm text-purple-300/80">
            {[
              { href: "/shop", label: "Shop All" },
              { href: "/custom-pieces", label: "Custom Pieces" },
              { href: "/about", label: "About" },
              { href: "/gallery", label: "Gallery" },
              { href: "/faq", label: "FAQ" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-purple-200 transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social & contact */}
        <div>
          <p className="text-purple-200 font-semibold mb-3 text-sm uppercase tracking-widest">
            Connect
          </p>
          <div className="space-y-2">
            <a
              href="mailto:crystalgoddesscreations@gmail.com"
              className="flex items-center gap-2 text-sm text-purple-300/80 hover:text-purple-200 transition"
            >
              <Mail size={16} /> crystalgoddesscreations@gmail.com
            </a>
            <a
              href="https://www.facebook.com/share/1AfqbUBz54/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-purple-300/80 hover:text-purple-200 transition"
            >
              <FacebookIcon /> Facebook
            </a>
            <a
              href="https://www.instagram.com/crystalgoddesscreations1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-purple-300/80 hover:text-purple-200 transition"
            >
              <InstagramIcon /> Instagram
            </a>
            <a
              href="https://www.tiktok.com/@crystal.goddess.c5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-purple-300/80 hover:text-purple-200 transition"
            >
              {/* TikTok icon (SVG inline, no package needed) */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.21 8.21 0 004.79 1.52V6.76a4.85 4.85 0 01-1.02-.07z" />
              </svg>
              TikTok
            </a>
          </div>
        </div>
      </div>

      <hr className="divider-glow" />
      <p className="text-center text-xs text-purple-400/60 py-4">
        © 2026 Crystal Goddess Creations. All rights reserved.
      </p>
    </footer>
  );
}
