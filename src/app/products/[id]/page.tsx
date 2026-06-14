import ProductPageClient from "./ProductPageClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  return <ProductPageClient id={id} />;
}
