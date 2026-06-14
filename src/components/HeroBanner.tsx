import Link from "next/link";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden min-h-[70vh] flex items-center justify-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f2e] via-[#0d0a14] to-[#1e0a2e]" />
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pink-600/15 blur-3xl animate-pulse delay-700" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-violet-500/10 blur-2xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Star decorations */}
        <div className="flex justify-center gap-3 mb-6 text-2xl select-none opacity-70">
          <span>✦</span>
          <span>✧</span>
          <span>✦</span>
        </div>

        <Image
          src="/CrystalGoddess.png"
          alt="Crystal Goddess Creations"
          width={420}
          height={420}
          className="mx-auto mb-4 drop-shadow-[0_0_40px_rgba(168,85,247,0.4)]"
          priority
        />

        <p className="text-purple-300/80 text-lg sm:text-xl mb-8 leading-relaxed">
          Handcrafted jewellery, healing crystals &amp; sacred pieces made with
          love and intention.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/shop"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold transition shadow-lg shadow-purple-900/40 text-sm"
          >
            Shop All
          </Link>
          <Link
            href="/custom-pieces"
            className="px-8 py-3 rounded-xl border border-purple-600/60 hover:border-purple-400 text-purple-200 hover:text-white font-semibold transition text-sm"
          >
            Custom Pieces
          </Link>
        </div>

        <div className="flex justify-center gap-3 mt-8 text-2xl select-none opacity-70">
          <span>✦</span>
          <span>✧</span>
          <span>✦</span>
        </div>
      </div>
    </section>
  );
}
