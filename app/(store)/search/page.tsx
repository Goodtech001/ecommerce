import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

// 1. Explicitly type searchParams as a Promise to satisfy Next.js 15+ constraints
interface SearchPageProps {
  searchParams: Promise<{
    query?: string;
  }>;
}

async function SearchPage({ searchParams }: SearchPageProps) {
  // 2. Properly await the incoming async search params stream
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query || "";
  
  const products = await searchProductsByName(query);

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm w-full max-w-4xl mt-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 text-center mb-2">
            No products found for &quot;{query}&quot;
          </h1>
          <p className="text-zinc-500 text-sm text-center">
            Try searching with different keywords or check your spelling.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm w-full max-w-4xl mt-8">
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 mb-6">
          Search results for &quot;{query}&quot;
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default SearchPage;