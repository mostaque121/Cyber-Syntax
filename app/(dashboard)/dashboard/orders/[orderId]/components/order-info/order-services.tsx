"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format-price";
import type { ServiceOrder } from "@/prisma/generated/prisma";
import { Package, Pencil, Plus } from "lucide-react";

interface ProductsListProps {
  services: ServiceOrder[];
  onAdd: () => void;
  onEdit: (id: string) => void;
}

export function OrderServices({ services, onAdd, onEdit }: ProductsListProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Package className="h-4 w-4" />
            Services
            <Badge variant="secondary" className="ml-2 font-normal">
              {services.length} {services.length === 1 ? "item" : "items"}
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
          {services.map((service) => {
            return (
              <div
                key={service.id}
                className="flex gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="font-medium leading-tight truncate">
                        {service.name}
                      </h4>

                      <p className="text-xs text-muted-foreground mt-1">
                        service type:{" "}
                        <span className="font-mono">{service.serviceType}</span>
                      </p>
                    </div>

                    <p className="text-right font-semibold whitespace-nowrap">
                      {formatPrice(service.price)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 px-2"
                    onClick={() => onEdit(service.id)}
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
