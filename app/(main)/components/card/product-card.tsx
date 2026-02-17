import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format-price";
import Image from "next/image";
import Link from "next/link";

export interface ProductCardType {
  images: {
    id: string;
    isFeatured: boolean;
    url: string;
  }[];
  id: string;
  title: string;
  slug: string;
  price: number;
  discountPercentage: number;
  isHotDeal: boolean;
  isFeatured: boolean;
}
interface SectionProps {
  product: ProductCardType;
}

export default function ProductCard({ product }: SectionProps) {
  const featuredImage =
    product.images.find((img) => img.isFeatured) || product.images[0];
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <Link key={product.id} href={`/product/${product.slug}`}>
      <div className="product-card cursor-pointer">
        {product.isHotDeal && (
          <Badge className="absolute top-2 z-10 left-2 bg-primary ">
            Hot Deal
          </Badge>
        )}
        {/* Image Container */}
        <div className="w-full flex items-center justify-center pt-2 relative">
          <Image
            src={featuredImage.url}
            alt={product.title}
            width={1000}
            height={1000}
            className="max-w-[80%] max-h-[90%] object-contain"
          />
        </div>

        {/* Info Overlay */}
        <div className="card-content">
          <h4 className=" text-[12px] md:text-[14px]  line-clamp-3 text-center font-semibold mb-1">
            {product.title}
          </h4>
          <div>
            {product.discountPercentage > 0 ? (
              <>
                <span className="text-primary text-[18px] font-semibold">
                  {formatPrice(discountedPrice)}
                </span>
                <span className="line-through text-xs text-black ml-3">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-primary text-[18px] font-semibold">
                {formatPrice(discountedPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
