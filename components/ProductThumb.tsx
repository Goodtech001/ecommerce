import { imageUrl } from "@/lib/imageUrl";
import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";

function ProductThumb({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;
  
  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group w-full flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 ${
        isOutOfStock ? "opacity-60 cursor-not-allowed" : "hover:translate-y-[-4px]"
      }`}
    >
      {/* Product Image Stage Canvas */}
      <div className="relative aspect-[4/5] w-full bg-[#f5f5f7] rounded-2xl overflow-hidden border border-zinc-100 transition-all duration-300 group-hover:border-zinc-200">
        {product.image && (
          <Image
            className="object-contain p-6 mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-102"
            src={imageUrl(product.image).url()}
            alt={product.name || "Product image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={false}
          />
        )}

        {/* Floating Actions Overlay Banner */}
        {!isOutOfStock && (
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="w-full py-3 bg-white/90 backdrop-blur-md rounded-xl text-xs font-bold text-zinc-900 text-center shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300 tracking-wider uppercase">
              View Product
            </span>
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/40 backdrop-blur-xs">
            <span className="bg-zinc-950/90 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-lg shadow-md border border-zinc-800">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Meta Text Blocks */}
      <div className="pt-4 pb-2 px-1 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-sm font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors line-clamp-1 flex-1">
            {product.name}
          </h2>
          <p className="text-sm font-bold text-zinc-900 font-mono shrink-0">
            £{product.price?.toFixed(2)}
          </p>
        </div>

        <p className="mt-1.5 text-xs text-zinc-500 line-clamp-2 leading-relaxed font-normal">
          {product.description?.map((block) => 
            block._type === "block" ? block.children?.map((child) => child.text).join("") : ""
          ).join("") || "No detailed description available."}
        </p>
      </div>
    </Link>
  );
}

export default ProductThumb;