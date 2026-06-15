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
          Hi, I&apos;m <strong className="text-pink-300">Leakona</strong>, the creator behind{" "}
          <strong className="text-purple-100">Crystal Goddess Creations</strong>. I live in Wilton,
          NSW, Australia, surrounded by family, animals, nature, and the chaos of everyday life.
        </p>

        <p>
          Crystal Goddess Creations began many years ago with a single wire-wrapped crystal. What
          started as a creative outlet quickly became a passion, and with the encouragement of some
          beautiful friends, I kept creating, learning, and pushing myself to see what was possible.
        </p>

        <p>
          I&apos;ve always been drawn to crystals. I love their natural beauty, their imperfections,
          their colours, and the fact that no two are ever exactly alike. Every stone has its own
          personality, and I see my role as bringing that personality to life rather than covering
          it up.
        </p>

        <p>
          I don&apos;t follow trends, and I don&apos;t really have a particular style. I create
          whatever sparks my imagination in the moment. To me, these pieces aren&apos;t just
          jewellery — they&apos;re wearable art.
        </p>

        <p>
          Every creation starts with a crystal. Sometimes I see a landscape hidden within the
          stone. Sometimes a dragon, a goddess, a creature, or a story waiting to be told. I sit
          down with wire and imagination and let the piece unfold. Some designs arrive fully formed
          in my mind, while others seem to create themselves as I work.
        </p>

        <p>
          Truthfully, most of the time I have no idea what I&apos;m doing. I simply trust the
          process and follow where the crystal leads. Somehow, it usually works out!
        </p>

        <p>
          Crystal Goddess Creations isn&apos;t a big company or a carefully crafted brand story.
          It&apos;s just me, sharing the things I love. The crystals that stop me in my tracks. The
          stories that live in my imagination. The joy of turning something beautiful from nature
          into something that can be worn and treasured.
        </p>

        <p>
          So whether you&apos;re here because you love crystals, appreciate handmade art, or
          you&apos;re simply curious to see what happens when creativity meets a little bit of chaos
          — welcome. I&apos;m glad you&apos;re here. ❤️
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
            &ldquo;Nature&apos;s art, made to be worn&rdquo; — Leakona 💜
          </p>
        </div>
      </div>
    </div>
  );
}
