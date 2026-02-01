"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { OrderStatus, PaymentMethod } from "@/prisma/generated/prisma";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  CreditCard,
  MapPin,
  Package,
  Phone,
  Settings,
  Truck,
  User,
} from "lucide-react";
import Image from "next/image";
import { getOrderDetails } from "../actions/profile.action";

interface OrderDetailProps {
  orderId: string;
  onBack: () => void;
}

const statusColors: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
  CONFIRMED: "bg-blue-100 text-blue-800 border-blue-300",
  PROCESSING: "bg-purple-100 text-purple-800 border-purple-300",
  SHIPPED: "bg-indigo-100 text-indigo-800 border-indigo-300",
  DELIVERED: "bg-green-100 text-green-800 border-green-300",
  CANCELLED: "bg-red-100 text-red-800 border-red-300",
  RETURNED: "bg-gray-100 text-gray-800 border-gray-300",
};

const paymentMethodLabels: Record<PaymentMethod, string> = {
  CASH: "Cash",
  BANK_TRANSFER: "Bank Transfer",
  CARD: "Card",
  MOBILE_BANKING: "Mobile Banking",
  OTHER: "Other",
};

export function OrderDetail({ orderId, onBack }: OrderDetailProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["order-detail", orderId],
    queryFn: () => getOrderDetails(orderId),
  });

  const order = data?.data;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !order) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500 mb-4">Failed to load order details</p>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
        </CardContent>
      </Card>
    );
  }

  const totalPaid = order.payments.reduce((sum, p) => sum + p.amount, 0);

  // Calculate totals from order items
  const productTotal = order.productOrders.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const serviceTotal = order.serviceOrders.reduce(
    (sum, item) => sum + item.price,
    0,
  );

  // Calculate actual amounts from percentages
  const productTaxAmount = (productTotal * order.productTax) / 100;
  const serviceTaxAmount = (serviceTotal * order.serviceTax) / 100;
  const subtotal = productTotal + serviceTotal + order.shippingCost;
  const discountAmount = (subtotal * order.discount) / 100;

  const orderTotal =
    productTotal +
    serviceTotal +
    order.shippingCost +
    productTaxAmount +
    serviceTaxAmount -
    discountAmount;
  const dueAmount = orderTotal - totalPaid;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle className="flex items-center gap-2">
              Order #{order.orderId}
              <Badge className={cn(statusColors[order.status])}>
                {order.status}
              </Badge>
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Calendar className="h-3 w-3" />
              {format(new Date(order.createdAt), "MMMM dd, yyyy 'at' h:mm a")}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Customer Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <User className="h-4 w-4" />
            Delivery Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-400" />
              <span>{order.customerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>{order.phoneNumber}</span>
            </div>
            <div className="flex items-start gap-2 md:col-span-2">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
              <span>{order.fullAddress}</span>
            </div>
          </div>
        </div>

        {/* Products */}
        {order.productOrders.length > 0 && (
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <Package className="h-4 w-4" />
              Products ({order.productOrders.length})
            </h3>
            <div className="space-y-3">
              {order.productOrders.map((item) => {
                const imageUrl =
                  item.productImage || item.product?.images?.[0]?.url;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 border rounded-lg"
                  >
                    {imageUrl ? (
                      <Image
                        width={64}
                        height={64}
                        src={imageUrl}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.productName}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>Qty: {item.quantity}</span>
                        {item.warranty && (
                          <span>Warranty: {item.warranty}</span>
                        )}
                      </div>
                      {item.serialNumber && item.serialNumber !== "1" && (
                        <p className="text-xs text-gray-400">
                          S/N: {item.serialNumber}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ৳{item.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        Total: ৳{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Services */}
        {order.serviceOrders.length > 0 && (
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <Settings className="h-4 w-4" />
              Services ({order.serviceOrders.length})
            </h3>
            <div className="space-y-3">
              {order.serviceOrders.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {service.serviceType}
                    </Badge>
                  </div>
                  <p className="font-semibold">
                    ৳{service.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Payment Summary */}
        <div>
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <CreditCard className="h-4 w-4" />
            Payment Summary
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            {productTotal > 0 && (
              <div className="flex justify-between text-sm">
                <span>Product Cost</span>
                <span>৳{productTotal.toLocaleString()}</span>
              </div>
            )}
            {serviceTotal > 0 && (
              <div className="flex justify-between text-sm">
                <span>Service Cost</span>
                <span>৳{serviceTotal.toLocaleString()}</span>
              </div>
            )}
            {order.shippingCost > 0 && (
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Truck className="h-3 w-3" /> Shipping
                </span>
                <span>৳{order.shippingCost.toLocaleString()}</span>
              </div>
            )}
            {order.productTax > 0 && (
              <div className="flex justify-between text-sm">
                <span>Product Tax ({order.productTax}%)</span>
                <span>৳{productTaxAmount.toLocaleString()}</span>
              </div>
            )}
            {order.serviceTax > 0 && (
              <div className="flex justify-between text-sm">
                <span>Service Tax ({order.serviceTax}%)</span>
                <span>৳{serviceTaxAmount.toLocaleString()}</span>
              </div>
            )}
            {order.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount ({order.discount}%)</span>
                <span>-৳{discountAmount.toLocaleString()}</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Order Total</span>
              <span className="text-primary">
                ৳{orderTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Payment History */}
        {order.payments.length > 0 && (
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <CheckCircle className="h-4 w-4" />
              Payment History
            </h3>
            <div className="space-y-2">
              {order.payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-green-800">
                      ৳{payment.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-green-600">
                      {paymentMethodLabels[payment.method]} •{" "}
                      {format(new Date(payment.date), "MMM dd, yyyy")}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-300">
                    Paid
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Due Amount */}
        {dueAmount > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-yellow-800">Amount Due</p>
                <p className="text-sm text-yellow-600">
                  Total Paid: ৳{totalPaid.toLocaleString()}
                </p>
              </div>
              <p className="text-xl font-bold text-yellow-800">
                ৳{dueAmount.toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {dueAmount <= 0 && totalPaid > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="font-semibold text-green-800">Fully Paid</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
