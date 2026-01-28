import { formatPrice } from "@/lib/format-price";
import Image from "next/image";
import Link from "next/link";
import { CctvPackageItem } from "../../types/cctv-package.types";

interface SectionProps {
  cctvPackage: CctvPackageItem;
}

export default function CctvPackageCard({ cctvPackage }: SectionProps) {
  const featuredImage =
    cctvPackage.images.find((img) => img.isFeatured) || cctvPackage.images[0];
  const discountedPrice =
    cctvPackage.price * (1 - cctvPackage.discountPercentage / 100);

  return (
    <Link
      key={cctvPackage.id}
      href={`/services/cctv-solution/${cctvPackage.slug}`}
    >
      <div className="product-card cursor-pointer">
        <div className="w-full flex items-center justify-center pt-2 relative">
          <Image
            src={featuredImage.url}
            alt={cctvPackage.title}
            width={600}
            height={600}
            className="object-contain max-w-[80%] max-h-[90%]"
          />
        </div>

        {/* Info Overlay */}
        <div className="card-content">
          <h4 className="text-[14px]  line-clamp-2 text-center font-semibold mb-1">
            {cctvPackage.title}
          </h4>
          <div>
            {cctvPackage.discountPercentage > 0 ? (
              <>
                <span className="text-primary text-[18px] font-semibold">
                  {formatPrice(discountedPrice)}
                </span>
                <span className="line-through text-xs text-black ml-3">
                  {formatPrice(cctvPackage.price)}
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
