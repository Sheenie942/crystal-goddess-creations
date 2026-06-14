import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Leakona",
  description: "Meet Leakona Fine — the creative soul and crystal lover behind Crystal Goddess Creations.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4 select-none">🔮</div>
        <h1 className="font-serif text-4xl font-bold gradient-text mb-3">
          Meet the Crystal Goddess
        </h1>
        <p className="text-purple-300/70 text-lg">Hi, I&apos;m Leakona.</p>
        <hr className="divider-glow mt-6" />
      </div>

      <div className="prose prose-invert max-w-none space-y-6 text-purple-200/90 text-base leading-relaxed">
        <p>
          Welcome to <strong className="text-purple-100">Crystal Goddess Creations</strong> — a
          home-based Australian business born from my deep love of crystals, healing energy, and
          handcrafted beauty. I&apos;m <strong className="text-pink-300">Leakona Fine</strong>, and
          this little shop is my heart made visible.
        </p>

        <p>
          My journey with crystals began as a personal one — drawn to their energy, their beauty,
          and the way each stone carries its own unique story. Over time that love grew into a
          passion for creating, and I found myself spending hours at my workbench crafting pieces
          that felt as magical to make as they are to wear.
        </p>

        <p>
          Jewellery-making is where my soul lights up. There&apos;s something deeply satisfying about
          taking a raw crystal — something the earth has spent thousands of years forming — and
          turning it into a wearable piece of art. Every necklace, bracelet, earring, and ring I
          create is made by hand with genuine care and intention. No two pieces are ever exactly
          the same.
        </p>

        <p>
          Beyond jewellery, I curate a beautiful range of crystals, selenite lamps, goddess boxes,
          and more — each item chosen because I genuinely love it and believe in what it brings.
          I only stock things I&apos;d be proud to gift to someone I love.
        </p>

        <div className="my-8 p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 to-pink-900/20 border border-purple-700/40">
          <p className="text-purple-100 font-medium text-lg mb-1">✨ Custom Pieces</p>
          <p className="text-purple-200/80 text-sm leading-relaxed">
            Custom pieces are my absolute favourite thing to create. If you have a vision —
            a crystal you&apos;re drawn to, a colour palette, a feeling you want to capture — I&apos;d
            love to bring it to life just for you. Reach out and let&apos;s create something
            truly one-of-a-kind together.
          </p>
          <Link
            href="/custom-pieces"
            className="inline-block mt-4 px-5 py-2 rounded-xl border border-pink-600/60 hover:border-pink-400 text-pink-300 hover:text-white text-sm transition"
          >
            Enquire about a custom piece →
          </Link>
        </div>

        <p>
          I believe crystals have the power to heal, inspire, and connect us to something
          greater than ourselves. Whether you&apos;re a lifelong crystal lover or just beginning
          your journey, I&apos;d be honoured to be part of it.
        </p>

        <p>
          Thank you for being here. Every order means the world to me — it allows me to keep
          doing what I love, and I pour that gratitude into every single piece I make.
        </p>

        <div className="text-center mt-10">
          <p className="text-2xl select-none">✦ ✧ ✦</p>
          <p className="text-purple-300/60 text-sm mt-2 italic">
            Made with love, crystals, and a little bit of magic. — Leakona 💜
          </p>
        </div>
      </div>
    </div>
  );
}
