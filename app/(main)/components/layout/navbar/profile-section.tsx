"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProfileSection() {
  const handleLogout = async () => {
    await authClient.signOut();
  };

  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex items-center space-x-1">
        <Avatar className="h-7 w-7 lg:h-8 lg:w-8">
          <AvatarFallback className="bg-gray-200 animate-pulse">
            <div className="h-4 w-4 bg-gray-300 rounded-full" />
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="flex items-center space-x-1 focus:outline-none hover:opacity-80 transition-opacity"
      >
        <Avatar className="h-7 w-7 lg:h-8 lg:w-8">
          <AvatarFallback className="bg-gray-700 text-white text-xs">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </Link>
    );
  }

  // If user is logged in
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="flex items-center focus:outline-none hover:opacity-80 transition-opacity">
        <Avatar className="h-9 w-9 border-gray-200 border">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <AvatarFallback className="bg-gray-700 text-white text-xs flex items-center justify-center">
              {session.user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
