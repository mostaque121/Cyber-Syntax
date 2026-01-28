import { OrderCustomerInfo } from "@/app/(dashboard)/types/order.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Mail, MapPin, Pencil, Phone, User } from "lucide-react";

interface CustomerInfoProps {
  order: OrderCustomerInfo;
  onEditClick: () => void;
}

export function CustomerInfo({ order, onEditClick }: CustomerInfoProps) {
  return (
    <Card>
      <CardHeader className=" flex items-center justify-between gap-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <User className="h-4 w-4" />
          Customer Info
        </CardTitle>
        <Button
          size="sm"
          variant="outline"
          className="h-8 bg-transparent"
          onClick={onEditClick}
        >
          <Pencil className="mr-1.5 h-3.5 w-3.5" />
          Edit
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{order.customerName}</p>
              {order.companyName && (
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Building2 className="h-3 w-3" />
                  {order.companyName}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm">{order.emailAddress}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Phone className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm">{order.phoneNumber}</p>
              {order.whatsappNumber &&
                order.whatsappNumber !== order.phoneNumber && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    WhatsApp: {order.whatsappNumber}
                  </p>
                )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Shipping Address</p>
              <p className="text-sm leading-relaxed">{order.fullAddress}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
