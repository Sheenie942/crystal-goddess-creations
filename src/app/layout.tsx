import type { Metadata } from "next";
import { Cinzel, Nunito } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import SiteShell from "@/components/SiteShell";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Crystal Goddess Creations",
    template: "%s | Crystal Goddess Creations",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/CrystalGoddessNoName.png", type: "image/png" },
    ],
    apple: "/CrystalGoddessNoName.png",
  },
  description:
    "Handcrafted jewellery, healing crystals, selenite lamps and sacred pieces made with love and intention. Shop online or request a custom piece.",
  openGraph: {
    siteName: "Crystal Goddess Creations",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[var(--font-nunito)] bg-[#0d0a14] text-[#f3e8ff]">
        <CartProvider>
          <SiteShell>{children}</SiteShell>
        </CartProvider>
      </body>
    </html>
  );
}
