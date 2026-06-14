import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse my gallery of handcrafted crystal jewellery and sacred pieces.",
};

// Placeholder gallery items — replace with real images in /public/gallery/
const GALLERY_ITEMS = [
  { id: 1, label: "Auravelle Necklace", category: "Jewellery", emoji: "💎" },
  { id: 2, label: "Pink Goddess Box", category: "Goddess Boxes", emoji: "💜" },
  { id: 3, label: "Triple Point Selenite Lamp", category: "Selenite Lamps", emoji: "🕯️" },
  { id: 4, label: "Raw Amethyst Cluster", category: "Crystals", emoji: "🔮" },
  { id: 5, label: "Bracelet Stack", category: "Jewellery", emoji: "✨" },
  { id: 6, label: "Reiki Stone Set", category: "Reiki", emoji: "🌙" },
  { id: 7, label: "Crystal Heart Collection", category: "Crystals", emoji: "💗" },
  { id: 8, label: "Goddess Earrings", category: "Jewellery", emoji: "⭐" },
  { id: 9, label: "Custom Crystal Pendant", category: "Custom", emoji: "🌟" },
];

export default function GalleryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4 select-none">🌟</div>
        <h1 className="font-serif text-4xl font-bold gradient-text mb-2">Gallery</h1>
        <p className="text-purple-300/70">
          A glimpse into my handcrafted world of crystals and jewellery.
        </p>
        <hr className="divider-glow mt-6" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.id}
            className="aspect-square bg-[#1a0f2e]/60 rounded-2xl border border-purple-900/30 overflow-hidden relative group card-glow"
          >
            {/* Placeholder — replace with <Image> once real photos are added */}
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
              <span className="text-5xl">{item.emoji}</span>
              <span className="text-xs text-purple-400 text-center">{item.label}</span>
              <span className="text-xs text-purple-600 text-center italic">
                {item.category}
              </span>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <p className="text-white text-xs font-medium">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-purple-400/60 text-sm italic">
          Add your product photos to{" "}
          <code className="text-purple-400">/public/gallery/</code> and update this page
          to display them.
        </p>
      </div>
    </div>
  );
}
