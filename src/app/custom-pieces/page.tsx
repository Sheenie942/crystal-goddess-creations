const GALLERY_ITEMS = [
  { id: 1, label: "Custom Bracelet Stack", emoji: "💜" },
  { id: 2, label: "Crystal Pendant Necklace", emoji: "🔮" },
  { id: 3, label: "Goddess Box Set", emoji: "✨" },
  { id: 4, label: "Selenite Lamp", emoji: "🕯️" },
  { id: 5, label: "Reiki Stone Set", emoji: "🌙" },
  { id: 6, label: "Raw Crystal Cluster", emoji: "💎" },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.908 1.438 5.504 3.686 7.21V22l3.372-1.851A10.6 10.6 0 0012 20.485c5.523 0 10-4.144 10-9.242C22 6.145 17.523 2 12 2zm1.018 12.443l-2.55-2.72-4.976 2.72 5.474-5.808 2.613 2.72 4.913-2.72-5.474 5.808z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}

export default function CustomPiecesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4 select-none">💍</div>
        <h1 className="font-serif text-4xl font-bold gradient-text mb-2">
          Custom Pieces
        </h1>
        <p className="text-purple-300/70 max-w-xl mx-auto">
          Have a vision? We&apos;d love to create something truly one-of-a-kind just for
          you — or as a meaningful gift for someone special.
        </p>
        <hr className="divider-glow mt-8" />
      </div>

      {/* Gallery of past work */}
      <section className="mb-16">
        <h2 className="font-serif text-2xl font-bold text-purple-200 mb-6 text-center">
          Past Custom Work
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="aspect-square bg-[#1a0f2e]/60 rounded-2xl border border-purple-900/30 flex flex-col items-center justify-center gap-3 p-4 text-center card-glow"
            >
              <span className="text-5xl">{item.emoji}</span>
              <span className="text-sm text-purple-300">{item.label}</span>
              <span className="text-xs text-purple-500 italic">
                Upload your images here
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-purple-500/60 mt-4 italic">
          Replace the placeholders above with your own photos via the /public/gallery/ folder.
        </p>
      </section>

      <hr className="divider-glow mb-12" />

      {/* Contact section */}
      <section className="max-w-lg mx-auto text-center">
        <h2 className="font-serif text-2xl font-bold gradient-text mb-2">
          Enquire About a Custom Piece
        </h2>
        <p className="text-purple-300/70 text-sm mb-10">
          Reach out via any of the channels below — we&apos;d love to hear your vision!
        </p>

        <div className="flex justify-center gap-8">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/crystalgoddesscreations1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex flex-col items-center gap-2 group"
          >
            <span className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1a0f2e]/60 border border-purple-700/50 group-hover:border-pink-400 group-hover:scale-105 transition text-white">
              <InstagramIcon />
            </span>
            <span className="text-sm text-purple-300/70 group-hover:text-white transition">Instagram</span>
          </a>

          {/* Messenger */}
          <a
            href="https://m.me/crystalgoddesscreations"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Messenger"
            className="flex flex-col items-center gap-2 group"
          >
            <span className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1a0f2e]/60 border border-purple-700/50 group-hover:border-blue-400 group-hover:scale-105 transition text-white">
              <MessengerIcon />
            </span>
            <span className="text-sm text-purple-300/70 group-hover:text-white transition">Messenger</span>
          </a>

          {/* Email */}
          <a
            href="mailto:crystalgoddesscreations@gmail.com"
            aria-label="Email"
            className="flex flex-col items-center gap-2 group"
          >
            <span className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1a0f2e]/60 border border-purple-700/50 group-hover:border-pink-400 group-hover:scale-105 transition text-white">
              <EmailIcon />
            </span>
            <span className="text-sm text-purple-300/70 group-hover:text-white transition">Email</span>
          </a>
        </div>
      </section>
    </div>
  );
}
