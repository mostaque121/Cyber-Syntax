"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format-price";
import type { ProductOrder } from "@/prisma/generated/prisma";
import { Package, Pencil, Plus } from "lucide-react";
import Image from "next/image";

interface ProductsListProps {
  products: ProductOrder[];
  onAdd: () => void;
  onEdit: (id: string) => void;
}

export function OrderProducts({ products, onAdd, onEdit }: ProductsListProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Package className="h-4 w-4" />
            Products
            <Badge variant="secondary" className="ml-2 font-normal">
              {products.length} {products.length === 1 ? "item" : "items"}
            </Badge>
          </CardTitle>

          <Button
            size="sm"
            variant="outline"
            className="h-8 bg-transparent"
            onClick={onAdd}
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add Item
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="divide-y">
          {products.map((product) => {
            const total = product.price * product.quantity;

            return (
              <div
                key={product.id}
                className="flex gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-muted">
                  <Image
                    src={product.productImage || "/placeholder.svg"}
                    alt={product.productName}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="font-medium leading-tight truncate">
                        {product.productName}
                      </h4>

                      {/* Serial number — now clearly shown */}
                      {product.serialNumber ? (
                        <p className="text-xs text-muted-foreground mt-1">
                          Serial:{" "}
                          <span className="font-mono">
                            {product.serialNumber}
                          </span>
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground mt-1">
                          Serial: N/A
                        </p>
                      )}
                    </div>

                    <p className="text-right font-semibold whitespace-nowrap">
                      {formatPrice(total)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Qty: {product.quantity}
                      </Badge>

                      {product.warranty && (
                        <Badge variant="secondary" className="text-xs">
                          {product.warranty}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {formatPrice(product.price)} each
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 px-2"
                    onClick={() => onEdit(product.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
