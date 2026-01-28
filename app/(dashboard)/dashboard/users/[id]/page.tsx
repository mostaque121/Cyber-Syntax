"use client";

import { DeleteDialog } from "@/components/custom-ui/delete-dialog";
import { LoadingButton } from "@/components/custom-ui/loading-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Role } from "@/prisma/generated/prisma";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ArrowLeft,
  Ban,
  Calendar,
  CheckCircle,
  Clock,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Monitor,
  Package,
  Phone,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  banUser,
  deleteUser,
  revokeAllSessions,
  revokeSession,
  unbanUser,
  updateUserRole,
} from "../../../actions/user-actions";
import { useUserById } from "../../../hooks/use-users";

const roleColors: Record<Role, string> = {
  ADMIN: "bg-red-100 text-red-800 border-red-300",
  MODERATOR: "bg-purple-100 text-purple-800 border-purple-300",
  CUSTOMER: "bg-blue-100 text-blue-800 border-blue-300",
};

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  const queryClient = useQueryClient();

  const { data: user, isLoading, isError, error } = useUserById(userId);

  const [showBanDialog, setShowBanDialog] = useState(false);
  const [banReason, setBanReason] = useState("");
  const [banExpires, setBanExpires] = useState("");

  const updateRoleMutation = useMutation({
    mutationFn: (newRole: Role) => updateUserRole(userId, newRole),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("User role updated successfully");
        queryClient.invalidateQueries({ queryKey: ["user", userId] });
        queryClient.invalidateQueries({ queryKey: ["users"] });
      } else {
        toast.error(result.error || "Failed to update role");
      }
    },
    onError: () => toast.error("Failed to update role"),
  });

  const banMutation = useMutation({
    mutationFn: () =>
      banUser(userId, banReason, banExpires ? new Date(banExpires) : undefined),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("User banned successfully");
        setShowBanDialog(false);
        setBanReason("");
        setBanExpires("");
        queryClient.invalidateQueries({ queryKey: ["user", userId] });
        queryClient.invalidateQueries({ queryKey: ["users"] });
      } else {
        toast.error(result.error || "Failed to ban user");
      }
    },
    onError: () => toast.error("Failed to ban user"),
  });

  const unbanMutation = useMutation({
    mutationFn: () => unbanUser(userId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("User unbanned successfully");
        queryClient.invalidateQueries({ queryKey: ["user", userId] });
        queryClient.invalidateQueries({ queryKey: ["users"] });
      } else {
        toast.error(result.error || "Failed to unban user");
      }
    },
    onError: () => toast.error("Failed to unban user"),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(userId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("User deleted successfully");
        router.push("/dashboard/users");
      } else {
        toast.error(result.error || "Failed to delete user");
      }
    },
    onError: () => toast.error("Failed to delete user"),
  });

  const revokeSessionMutation = useMutation({
    mutationFn: (sessionId: string) => revokeSession(sessionId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Session revoked");
        queryClient.invalidateQueries({ queryKey: ["user", userId] });
      } else {
        toast.error(result.error || "Failed to revoke session");
      }
    },
    onError: () => toast.error("Failed to revoke session"),
  });

  const revokeAllMutation = useMutation({
    mutationFn: () => revokeAllSessions(userId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("All sessions revoked");
        queryClient.invalidateQueries({ queryKey: ["user", userId] });
      } else {
        toast.error(result.error || "Failed to revoke sessions");
      }
    },
    onError: () => toast.error("Failed to revoke sessions"),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="px-4 md:px-8 py-8 container mx-auto">
        <div className="text-center py-12">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">User Not Found</h2>
          <p className="text-gray-500 mb-4">
            {error?.message || "The user you're looking for doesn't exist."}
          </p>
          <Button onClick={() => router.push("/dashboard/users")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-8 container mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/dashboard/users")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="font-bold text-2xl">User Details</h1>
          <p className="text-gray-500 text-sm">
            View and manage user information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback className="text-2xl">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Role Badge */}
            <div className="flex items-center justify-center gap-2">
              <Badge
                className={cn("flex items-center gap-1", roleColors[user.role])}
              >
                {user.role === "ADMIN" && <ShieldAlert className="h-3 w-3" />}
                {user.role === "MODERATOR" && (
                  <ShieldCheck className="h-3 w-3" />
                )}
                {user.role}
              </Badge>
              {user.banned ? (
                <Badge variant="destructive">Banned</Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-300"
                >
                  Active
                </Badge>
              )}
            </div>

            <Separator />

            {/* User Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
                {user.emailVerified ? (
                  <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                ) : (
                  <XCircle className="h-4 w-4 text-gray-400 ml-auto" />
                )}
              </div>
              {user.phoneNumber && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{user.phoneNumber}</span>
                </div>
              )}
              {user.companyName && (
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="h-4 w-4" />
                  <span>{user.companyName}</span>
                </div>
              )}
              {user.fullAddress && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{user.fullAddress}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>
                  Joined {format(new Date(user.createdAt), "MMM dd, yyyy")}
                </span>
              </div>
            </div>

            <Separator />

            {/* Role Change (Admin only) */}
            <div className="space-y-2">
              <Label>Change Role (Admin Only)</Label>
              <Select
                value={user.role}
                onValueChange={(value) =>
                  updateRoleMutation.mutate(value as Role)
                }
                disabled={updateRoleMutation.isPending}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="MODERATOR">Moderator</SelectItem>
                  <SelectItem value="CUSTOMER">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Ban/Unban Actions */}
            <div className="space-y-2">
              {user.banned ? (
                <>
                  <div className="p-3 bg-red-50 rounded-lg text-sm">
                    <p className="font-medium text-red-800">Ban Reason:</p>
                    <p className="text-red-600">{user.banReason || "N/A"}</p>
                    {user.banExpires && (
                      <p className="text-red-600 mt-1">
                        Expires:{" "}
                        {format(new Date(user.banExpires), "MMM dd, yyyy")}
                      </p>
                    )}
                  </div>
                  <LoadingButton
                    loading={unbanMutation.isPending}
                    className="w-full"
                    variant="outline"
                    onClick={() => unbanMutation.mutate()}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Unban User
                  </LoadingButton>
                </>
              ) : (
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => setShowBanDialog(true)}
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Ban User
                </Button>
              )}
            </div>

            <Separator />

            {/* Delete User (Admin only) */}
            <DeleteDialog
              title="Delete User"
              description="Are you sure you want to delete this user? This will also delete all their orders, sessions, and other data. This action cannot be undone."
              onConfirm={() => deleteMutation.mutate()}
            >
              <Button
                variant="outline"
                className="w-full text-red-600 border-red-300 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete User
              </Button>
            </DeleteDialog>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Sessions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Sessions</CardTitle>
                <CardDescription>
                  {
                    user.sessions.filter(
                      (s) => new Date(s.expiresAt) > new Date()
                    ).length
                  }{" "}
                  active,{" "}
                  {
                    user.sessions.filter(
                      (s) => new Date(s.expiresAt) <= new Date()
                    ).length
                  }{" "}
                  expired
                </CardDescription>
              </div>
              {user.sessions.length > 0 && (
                <LoadingButton
                  loading={revokeAllMutation.isPending}
                  variant="outline"
                  size="sm"
                  onClick={() => revokeAllMutation.mutate()}
                >
                  Revoke All
                </LoadingButton>
              )}
            </CardHeader>
            <CardContent>
              {user.sessions.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No sessions found
                </p>
              ) : (
                <div className="space-y-3">
                  {user.sessions.map((session) => {
                    const isExpired = new Date(session.expiresAt) <= new Date();
                    return (
                      <div
                        key={session.id}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg",
                          isExpired ? "bg-red-50" : "bg-gray-50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Monitor
                            className={cn(
                              "h-5 w-5",
                              isExpired ? "text-red-400" : "text-gray-500"
                            )}
                          />
                          <div className="text-sm">
                            <div className="flex items-center gap-2">
                              <p
                                className={cn(
                                  "font-medium truncate max-w-[250px]",
                                  isExpired && "text-gray-500"
                                )}
                              >
                                {session.userAgent || "Unknown Device"}
                              </p>
                              {isExpired ? (
                                <Badge
                                  variant="outline"
                                  className="bg-red-100 text-red-700 border-red-300 text-xs"
                                >
                                  Expired
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="bg-green-100 text-green-700 border-green-300 text-xs"
                                >
                                  Active
                                </Badge>
                              )}
                            </div>
                            <div
                              className={cn(
                                "flex items-center gap-2",
                                isExpired ? "text-red-400" : "text-gray-500"
                              )}
                            >
                              <Globe className="h-3 w-3" />
                              <span>{session.ipAddress || "Unknown IP"}</span>
                              <Clock className="h-3 w-3 ml-2" />
                              <span>
                                Created:{" "}
                                {format(
                                  new Date(session.createdAt),
                                  "MMM dd, HH:mm"
                                )}
                              </span>
                              <span className="mx-1">•</span>
                              <span>
                                {isExpired ? "Expired:" : "Expires:"}{" "}
                                {format(
                                  new Date(session.expiresAt),
                                  "MMM dd, HH:mm"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <LoadingButton
                          loading={revokeSessionMutation.isPending}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() =>
                            revokeSessionMutation.mutate(session.id)
                          }
                        >
                          {isExpired ? "Remove" : "Revoke"}
                        </LoadingButton>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Recent Orders
              </CardTitle>
              <CardDescription>
                {user._count.orders} total order(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.orders.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No orders yet</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.orders.map((order) => (
                      <TableRow
                        key={order.orderId}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() =>
                          router.push(`/dashboard/orders/${order.orderId}`)
                        }
                      >
                        <TableCell className="font-medium">
                          {order.orderId}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{order.orderType}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={cn(
                              order.status === "PENDING" &&
                                "bg-yellow-100 text-yellow-800",
                              order.status === "CONFIRMED" &&
                                "bg-blue-100 text-blue-800",
                              order.status === "PROCESSING" &&
                                "bg-purple-100 text-purple-800",
                              order.status === "SHIPPED" &&
                                "bg-indigo-100 text-indigo-800",
                              order.status === "DELIVERED" &&
                                "bg-green-100 text-green-800",
                              order.status === "CANCELLED" &&
                                "bg-red-100 text-red-800"
                            )}
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {order.productOrders.length +
                            order.serviceOrders.length}
                        </TableCell>
                        <TableCell className="text-gray-500">
                          {format(new Date(order.createdAt), "MMM dd, yyyy")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Auth Providers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Connected Accounts</CardTitle>
              <CardDescription>
                Authentication providers linked to this account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.accounts.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No connected accounts
                </p>
              ) : (
                <div className="space-y-2">
                  {user.accounts.map((account, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="capitalize">
                          {account.providerId}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">
                        Connected{" "}
                        {format(new Date(account.createdAt), "MMM dd, yyyy")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* User Cart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Cart Items
              </CardTitle>
              <CardDescription>
                {user.cart?.items.length || 0} item(s) in cart
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!user.cart || user.cart.items.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No items in cart
                </p>
              ) : (
                <div className="space-y-3">
                  {user.cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                    >
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          height={48}
                          width={48}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.name}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Qty: {item.quantity}</span>
                          <span>৳{item.price.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(item.createdAt), "MMM dd")}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-medium">Cart Total:</span>
                    <span className="font-bold text-lg text-primary">
                      ৳
                      {user.cart.items
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ban Dialog */}
      <Dialog open={showBanDialog} onOpenChange={setShowBanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ban User</DialogTitle>
            <DialogDescription>
              Provide a reason for banning this user. All their sessions will be
              revoked.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="banReason">Ban Reason *</Label>
              <Textarea
                id="banReason"
                placeholder="Enter the reason for banning this user..."
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="banExpires">
                Ban Expires (optional - leave empty for permanent)
              </Label>
              <Input
                id="banExpires"
                type="datetime-local"
                value={banExpires}
                onChange={(e) => setBanExpires(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBanDialog(false)}>
              Cancel
            </Button>
            <LoadingButton
              loading={banMutation.isPending}
              variant="destructive"
              onClick={() => banMutation.mutate()}
              disabled={!banReason.trim()}
            >
              Ban User
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
