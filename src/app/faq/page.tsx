import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about shopping, shipping, and custom pieces.",
};

const FAQS = [
  {
    category: "Shopping & Orders",
    items: [
      {
        q: "How do I place an order?",
        a: "Browse my shop, add items to your cart, then proceed to checkout. Payments are processed securely through Square — I accept Visa, Mastercard, Amex, Apple Pay, Google Pay, and Afterpay.",
      },
      {
        q: "Do you accept Afterpay?",
        a: "Yes! I accept Afterpay at checkout so you can split your purchase into four interest-free instalments.",
      },
      {
        q: "Can I change or cancel my order?",
        a: "Please contact me as soon as possible at crystalgoddesscreations@gmail.com if you need to change or cancel an order. I process orders quickly, so I can&apos;t always guarantee changes once an order is placed.",
      },
      {
        q: "Do you ship internationally?",
        a: "I currently ship within Australia. Please reach out if you&apos;re located overseas — I may be able to arrange international shipping on a case-by-case basis.",
      },
      {
        q: "How long does shipping take?",
        a: "Standard Australian shipping typically takes 3–7 business days depending on your location. You will receive a tracking number once your order has been dispatched.",
      },
      {
        q: "What if my order arrives damaged?",
        a: "I pack every order with great care, but if something arrives damaged please email me within 48 hours with a photo and I&apos;ll make it right.",
      },
    ],
  },
  {
    category: "Custom Pieces",
    items: [
      {
        q: "How do I request a custom piece?",
        a: "Visit my Custom Pieces page and fill in the request form with your name, email, a description of what you&apos;d like, and your approximate budget. I&apos;ll get back to you within 2–3 business days.",
      },
      {
        q: "What can I request as a custom piece?",
        a: "I can create custom jewellery (necklaces, bracelets, earrings, rings), crystal sets, and goddess boxes. If you&apos;re not sure if your idea is possible, just ask — I love a creative challenge!",
      },
      {
        q: "How long do custom pieces take?",
        a: "Custom pieces typically take 1–3 weeks depending on complexity and materials availability. I&apos;ll give you an estimated timeframe when I confirm your order.",
      },
      {
        q: "Do I need to pay a deposit for custom pieces?",
        a: "Yes, I require a 50% deposit upfront to begin work on your custom piece, with the remaining balance due before dispatch.",
      },
      {
        q: "Can I see examples of past custom work?",
        a: "Absolutely — visit my Gallery page to see examples of custom and featured pieces I&apos;ve created.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4 select-none">✨</div>
        <h1 className="font-serif text-4xl font-bold gradient-text mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-purple-300/70">Everything you need to know.</p>
        <hr className="divider-glow mt-6" />
      </div>

      <div className="space-y-10">
        {FAQS.map((section) => (
          <div key={section.category}>
            <h2 className="font-serif text-xl font-semibold text-purple-200 mb-4">
              {section.category}
            </h2>
            <div className="space-y-3">
              {section.items.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-[#1a0f2e]/60 border border-purple-900/30 rounded-xl overflow-hidden"
                >
                  <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-purple-200 hover:text-white transition flex items-center justify-between list-none">
                    <span>{faq.q}</span>
                    <span className="ml-3 text-purple-500 group-open:rotate-180 transition-transform text-lg select-none">
                      ⌄
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-purple-300/80 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-purple-300/70 text-sm mb-3">
          Still have questions? We&apos;re happy to help.
        </p>
        <a
          href="mailto:crystalgoddesscreations@gmail.com"
          className="inline-block px-6 py-2.5 rounded-xl border border-purple-600/60 hover:border-purple-400 text-purple-200 hover:text-white transition text-sm"
        >
          Email Us
        </a>
      </div>
    </div>
  );
}
