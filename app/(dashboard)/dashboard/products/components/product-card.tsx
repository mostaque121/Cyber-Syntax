"use client";

import { ProductWithRelation } from "@/app/(dashboard)/types/products.types";
import { DeleteDialog } from "@/components/custom-ui/delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatPrice } from "@/lib/format-price";
import { Edit, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";

interface AdminProductCardProps {
  product: ProductWithRelation;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  isDeleting?: boolean;
}

export function DashboardProductCard({
  product,
  onDelete,
  onEdit,
  isDeleting = false,
}: AdminProductCardProps) {
  const featuredImage =
    product.images.find((img) => img.isFeatured) || product.images[0];

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <Card className="overflow-hidden py-0 gap-3 hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        {/* Featured Image */}
        <div className="relative aspect-square bg-muted">
          {featuredImage ? (
            <Image
              src={featuredImage.url}
              alt={product.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No Image
            </div>
          )}

          {product.isHotDeal && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Hot Deal
            </Badge>
          )}
          {product.isFeatured && (
            <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
              Featured
            </Badge>
          )}
          {!product.isAvailable && (
            <>
              {/* Dark overlay layer */}
              <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] rounded-md" />

              {/* Centered Unavailable badge */}
              <Badge className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700">
                Unavailable
              </Badge>
            </>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground">{product.brand}</p>

          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">
              {formatPrice(discountedPrice)}
            </span>

            {product.discountPercentage > 0 && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
                <Badge variant="secondary" className="text-xs">
                  -{product.discountPercentage}%
                </Badge>
              </>
            )}
          </div>
        </div>
      </CardContent>

      {/* Footer Buttons */}
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onEdit(product.id)}
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>

        <DeleteDialog
          onConfirm={() => onDelete(product.id)}
          title="Are you absolutely sure?"
          description={`This action cannot be undone. This will permanently delete the product "${product.title}" and remove all related data.`}
        >
          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </>
            )}
          </Button>
        </DeleteDialog>
      </CardFooter>
    </Card>
  );
}
