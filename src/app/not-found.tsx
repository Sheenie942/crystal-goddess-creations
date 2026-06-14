import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="text-6xl mb-6 select-none">🔮</div>
      <h1 className="font-serif text-4xl font-bold gradient-text mb-3">
        Page Not Found
      </h1>
      <p className="text-purple-300/70 mb-8 max-w-sm">
        This page has vanished into the crystal realm. Let&apos;s guide you back.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold transition text-sm"
        >
          Go Home
        </Link>
        <Link
          href="/shop"
          className="px-6 py-3 rounded-xl border border-purple-600/50 hover:border-purple-400 text-purple-200 hover:text-white transition text-sm"
        >
          Shop All
        </Link>
      </div>
    </div>
  );
}
