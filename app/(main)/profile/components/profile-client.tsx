"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Package, User } from "lucide-react";
import { getCurrentUser, hasPasswordAuth } from "../actions/profile.action";
import { OrdersList } from "./orders-list";
import { PasswordChangeForm } from "./password-change-form";
import { ProfileForm } from "./profile-form";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileClient() {
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });

  const { data: hasPassword, isLoading: passwordLoading } = useQuery({
    queryKey: ["has-password-auth"],
    queryFn: hasPasswordAuth,
  });

  if (userLoading || passwordLoading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <Skeleton className="h-10 w-48 mb-6" />
        <Skeleton className="h-12 w-full mb-6" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl text-center">
        <p className="text-gray-500">Failed to load user profile</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Orders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileForm user={user} />
          {hasPassword && <PasswordChangeForm />}
        </TabsContent>

        <TabsContent value="orders">
          <OrdersList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
