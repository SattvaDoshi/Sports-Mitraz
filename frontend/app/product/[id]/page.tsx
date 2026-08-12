// app/product/[id]/page.tsx
import ProductDetail from "@/components/ProductDetail";
import { getProductById } from "@/lib/data";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist or was removed.</p>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}