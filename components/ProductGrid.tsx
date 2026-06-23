"use client";
import { Product } from "@/sanity.types";
import { AnimatePresence, motion } from "framer-motion";
import ProductThumb from "./ProductThumb";

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
} as const;

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <motion.div 
      variants={gridVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10"
    >
      {products?.map((product) => (
        <AnimatePresence key={product._id} mode="popLayout">
          <motion.div variants={itemVariants} className="w-full flex justify-center">
            <ProductThumb product={product} />
          </motion.div>
        </AnimatePresence>
      ))}
    </motion.div>
  );
}

export default ProductGrid;