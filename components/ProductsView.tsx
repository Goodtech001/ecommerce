import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/category-selector";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div className="space-y-8">
      {/* Editorial Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-200/80 pb-5 gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-zinc-900">Curated Collection</h3>
          <p className="text-sm text-zinc-500 mt-1">Discover meticulously crafted essentials designed for modern environments.</p>
        </div>
        <div className="w-full sm:w-64">
          <CategorySelectorComponent categories={categories} />
        </div>
      </div>

      {/* Grid Display Container */}
      <div className="w-full">
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default ProductsView;