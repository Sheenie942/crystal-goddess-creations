"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingBag, X, ChevronDown, ChevronRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { CATEGORIES, type Subcategory } from "@/types";
import clsx from "clsx";

type NavLink = {
  href: string;
  label: string;
  image?: string;
  subcategories?: Subcategory[];
};

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop All" },
  ...CATEGORIES.map((c) => ({
    href: `/${c.slug}`,
    label: c.name,
    image: c.image,
    subcategories: c.subcategories,
  })),
  { href: "/custom-pieces", label: "Custom Pieces" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header({
  onCartOpen,
}: {
  onCartOpen: () => void;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { totalItems } = useCart();

  return (
    <>
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-40 bg-[#0d0a14]/95 backdrop-blur border-b border-purple-900/40">
        <div className="max-w-7xl mx-auto px-4 h-40 flex items-center justify-between">
          {/* Hamburger */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            className="p-2 rounded-lg text-purple-300 hover:text-white hover:bg-purple-900/40 transition"
          >
            <Menu size={24} />
          </button>

          {/* Logo / site name */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          >
            <Image
              src="/CrystalGoddess.png"
              alt="Crystal Goddess Creations"
              width={160}
              height={160}
              className="rounded-full object-cover"
              priority
            />
            <span className="display:none;font-serif text-xl font-bold gradient-text tracking-wide whitespace-nowrap hidden sm:block">
              Crystal Goddess Creations
            </span>
          </Link>

          {/* Cart */}
          <button
            onClick={onCartOpen}
            aria-label="Open cart"
            className="relative p-2 rounded-lg text-purple-300 hover:text-white hover:bg-purple-900/40 transition"
          >
            <ShoppingBag size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ── Backdrop ── */}
      <div
        className={clsx(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setDrawerOpen(false)}
      />

      {/* ── Drawer ── */}
      <nav
        className={clsx(
          "fixed top-0 left-0 z-50 h-full w-80 bg-[#12091f] border-r border-purple-900/50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out overflow-y-auto",
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-purple-900/40">
          <Link href="/" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3">
            <Image
              src="/CrystalGoddessNoName.png"
              alt="Crystal Goddess Creations"
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
            <span className="font-serif text-lg font-bold gradient-text">Menu</span>
          </Link>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="p-1.5 rounded text-purple-300 hover:text-white hover:bg-purple-900/40 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links */}
        <ul className="flex-1 py-4 space-y-0.5 px-3">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              {link.subcategories ? (
                <>
                  <button
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-purple-200 hover:bg-purple-900/30 hover:text-white transition text-sm font-medium"
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === link.href ? null : link.href
                      )
                    }
                  >
                    <span className="flex items-center gap-3">
                      {link.image && (
                        <span className="w-32 h-32 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={link.image}
                            alt={link.label}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        </span>
                      )}
                      {link.label}
                    </span>
                    {expandedCategory === link.href ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                  {expandedCategory === link.href && (
                    <ul className="ml-4 mt-0.5 space-y-0.5">
                      <li>
                        <Link
                          href={link.href}
                          onClick={() => setDrawerOpen(false)}
                          className="block px-3 py-2 rounded-lg text-purple-300 hover:bg-purple-900/20 hover:text-white transition text-sm italic"
                        >
                          All {link.label}
                        </Link>
                      </li>
                      {link.subcategories.map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            href={`${link.href}?sub=${sub.slug}`}
                            onClick={() => setDrawerOpen(false)}
                            className="block px-3 py-2 rounded-lg text-purple-300/80 hover:bg-purple-900/20 hover:text-white transition text-sm"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-purple-200 hover:bg-purple-900/30 hover:text-white transition text-sm font-medium"
                >
                  {link.image && (
                    <span className="w-32 h-32 flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={link.image}
                        alt={link.label}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </span>
                  )}
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Drawer footer */}
        <div className="px-5 py-4 border-t border-purple-900/40 text-xs text-purple-400 text-center">
          © 2026 Crystal Goddess Creations
        </div>
      </nav>
    </>
  );
}
