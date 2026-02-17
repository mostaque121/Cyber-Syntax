import Link from "next/link";
import { getFeaturedProducts } from "../../actions/product-actions";
import ProductCard from "../card/product-card";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();
  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <div className="flex border-b pb-4 mb-4 border-[#dee2e6] gap-4 flex-wrap justify-between items-center">
        <h2 className="text-[18px]  px-1  md:text-[32px]  font-bold text-black">
          FEATURED PRODUCTS
        </h2>
        <Link
          href="/products"
          className="text-[14px] hover:underline transition-all duration-200 text-primary"
        >
          SEE ALL
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
