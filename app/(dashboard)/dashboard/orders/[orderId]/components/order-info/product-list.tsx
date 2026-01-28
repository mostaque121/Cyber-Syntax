"use client";

import type { ServiceProduct } from "@/app/(main)/types/product-list.type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/format-price";
import { Package, Plus } from "lucide-react";

interface ProductsListProps {
  products: ServiceProduct[];
  onEditClick: () => void;
}

export function ProductsList({ products, onEditClick }: ProductsListProps) {
  const grandTotal = products.reduce((sum, p) => {
    const qty = Number(p.qty);
    const price = Number(p.price);
    return sum + qty * price;
  }, 0);

  return (
    <Card className="pb-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Package className="h-4 w-4" />
            Products / Services
            <Badge variant="secondary" className="ml-2 font-normal">
              {products.length} {products.length === 1 ? "item" : "items"}
            </Badge>
          </CardTitle>

          <Button
            size="sm"
            variant="outline"
            className="h-8 bg-transparent"
            onClick={onEditClick}
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            {products.length > 0 ? "Edit" : "Add"} Item
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* 🔥 Empty State */}
        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
            <Package className="h-10 w-10 mb-2 opacity-40" />
            <p className="font-medium">No items added yet</p>
            <p className="text-sm mt-1 mb-4">Click below to add items</p>

            <Button size="sm" onClick={onEditClick}>
              <Plus className="mr-1.5 h-4 w-4" /> Add Item
            </Button>
          </div>
        )}

        {/* 🔥 Table */}
        {products.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[260px] font-medium">Product</TableHead>
                <TableHead className="font-medium">Warranty</TableHead>
                <TableHead className="text-center font-medium">Qty</TableHead>
                <TableHead className="text-right font-medium">Price</TableHead>
                <TableHead className="text-right font-medium">Total</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((product, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <p className="font-medium text-sm">{product.name}</p>

                    <Badge
                      variant="secondary"
                      className="mt-1 text-xs font-normal"
                    >
                      {product.serialNumber ?? "N/A"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                      {product.warranty ?? "N/A"}
                    </code>
                  </TableCell>

                  <TableCell className="text-center">{product.qty}</TableCell>

                  <TableCell className="text-right">
                    {formatPrice(product.price)}
                  </TableCell>

                  <TableCell className="text-right font-medium">
                    {formatPrice(Number(product.qty) * Number(product.price))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow className="bg-muted/30 font-medium">
                <TableCell colSpan={4} className="text-right">
                  Subtotal
                </TableCell>
                <TableCell className="text-right text-base">
                  {formatPrice(grandTotal)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
