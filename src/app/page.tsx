import HeroBanner from "@/components/HeroBanner";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import SocialLinks from "@/components/SocialLinks";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <hr className="divider-glow" />
      <CategoryGrid />
      <hr className="divider-glow" />
      <FeaturedProducts />
      <hr className="divider-glow" />
      <SocialLinks />
    </>
  );
}
