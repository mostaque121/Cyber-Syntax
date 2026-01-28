"use client";

import { CctvPackageWithRelation } from "@/app/(dashboard)/types/cctvpackage.types";
import { DeleteDialog } from "@/components/custom-ui/delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatPrice } from "@/lib/format-price";
import { Edit, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";

interface AdminProductCardProps {
  cctvPackage: CctvPackageWithRelation;
  onDelete: (id: string) => Promise<void> | void;
  onEdit: (id: string) => void;
  isDeleting?: boolean;
}

export function DashboardCctvPackageCard({
  cctvPackage,
  onDelete,
  onEdit,
  isDeleting = false,
}: AdminProductCardProps) {
  const featuredImage =
    cctvPackage.images.find((img) => img.isFeatured) || cctvPackage.images[0];

  const discountedPrice =
    cctvPackage.price * (1 - cctvPackage.discountPercentage / 100);

  const handleDelete = async () => {
    await onDelete(cctvPackage.id);
  };

  return (
    <Card className="overflow-hidden py-0 gap-3 hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        {/* Featured Image */}
        <div className="relative aspect-square bg-muted">
          {featuredImage ? (
            <Image
              src={featuredImage.url}
              alt={cctvPackage.title}
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

          {!cctvPackage.isAvailable && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Not Available
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2">
            {cctvPackage.title}
          </h3>

          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">
              {formatPrice(discountedPrice)}
            </span>

            {cctvPackage.discountPercentage > 0 && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(cctvPackage.price)}
                </span>
                <Badge variant="secondary" className="text-xs">
                  -{cctvPackage.discountPercentage}%
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
          onClick={() => onEdit(cctvPackage.id)}
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>

        <DeleteDialog
          onConfirm={handleDelete}
          title="Are you absolutely sure?"
          description={`This action cannot be undone. This will permanently delete the package "${cctvPackage.title}" and remove all related data.`}
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
