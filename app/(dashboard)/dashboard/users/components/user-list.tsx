"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Role } from "@/prisma/generated/prisma";
import { format } from "date-fns";
import {
  CheckCircle,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: Role;
  emailVerified: boolean;
  banned: boolean | null;
  banReason: string | null;
  banExpires: Date | null;
  createdAt: Date;
  _count: {
    orders: number;
    sessions: number;
  };
}

interface UserListProps {
  users: User[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  className?: string;
}

const roleColors: Record<Role, string> = {
  ADMIN: "bg-red-100 text-red-800 border-red-300",
  MODERATOR: "bg-purple-100 text-purple-800 border-purple-300",
  CUSTOMER: "bg-blue-100 text-blue-800 border-blue-300",
};

const roleIcons: Record<Role, React.ReactNode> = {
  ADMIN: <ShieldAlert className="h-3 w-3 mr-1" />,
  MODERATOR: <ShieldCheck className="h-3 w-3 mr-1" />,
  CUSTOMER: null,
};

export default function UserList({
  users,
  isLoading,
  isError,
  error,
  className,
}: UserListProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-500">
        Error: {error?.message || "Failed to load users"}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">No users found.</div>
    );
  }

  return (
    <Card className={cn("mt-6", className)}>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          Manage user accounts, roles, and permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Sessions</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => router.push(`/dashboard/users/${user.id}`)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.image || ""} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "flex items-center w-fit",
                      roleColors[user.role]
                    )}
                  >
                    {roleIcons[user.role]}
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.banned ? (
                    <Badge
                      variant="destructive"
                      className="flex items-center w-fit gap-1"
                    >
                      <XCircle className="h-3 w-3" />
                      Banned
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="flex items-center w-fit gap-1 bg-green-50 text-green-700 border-green-300"
                    >
                      <CheckCircle className="h-3 w-3" />
                      Active
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {user.emailVerified ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-gray-400" />
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary">{user._count.orders}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary">{user._count.sessions}</Badge>
                </TableCell>
                <TableCell className="text-gray-500 text-sm">
                  {format(new Date(user.createdAt), "MMM dd, yyyy")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
