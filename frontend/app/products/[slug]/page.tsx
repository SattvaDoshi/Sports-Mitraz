import CategoryPage from "@/components/CategoryPage";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <CategoryPage params={params} />;
}

export { generateStaticParams } from "@/components/CategoryPage";