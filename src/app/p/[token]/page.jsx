import { notFound } from "next/navigation";
import ProductPage from "@/components/storefront/ProductPage";
import { getStorefrontProduct } from "@/lib/storefront";

// A product page is made for one customer's link and shows live price and stock: never cached, never indexed.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { token } = await params;
  const product = await getStorefrontProduct(token).catch(() => null);
  if (!product) return { title: "Product not found", robots: { index: false, follow: false } };
  const description = (product.description || `${product.name} - ${product.businessName}`).slice(0, 160);
  return {
    title: { absolute: `${product.name} | ${product.businessName}` },
    description,
    robots: { index: false, follow: false },
    openGraph: { title: product.name, description, type: "website", siteName: product.businessName, ...(product.images[0] ? { images: [product.images[0]] } : {}) }
  };
}

export default async function Page({ params }) {
  const { token } = await params;
  const product = await getStorefrontProduct(token);
  if (!product) notFound();
  return <ProductPage token={token} product={product} />;
}
