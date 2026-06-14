import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/types";

export default function CategoryGrid() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center font-serif text-3xl font-bold gradient-text mb-2">
          Shop by Category
        </h2>
        <p className="text-center text-purple-300/70 mb-10 text-sm">
          Explore our handcrafted collections
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="group flex flex-col items-center gap-3 p-5 bg-[#1a0f2e]/60 rounded-2xl border border-purple-900/30 card-glow text-center overflow-hidden"
            >
              {category.image ? (
                <div className="w-full aspect-square rounded-xl overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
              ) : (
                <span className="text-4xl">✦</span>
              )}
              <span className="text-sm font-medium text-purple-200 group-hover:text-white transition">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
