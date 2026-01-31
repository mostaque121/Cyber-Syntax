"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma, Role } from "@/prisma/generated/prisma";
import { headers } from "next/headers";

export type UserWithDetails = Awaited<ReturnType<typeof getUserById>>;

// Fetch users with pagination and filters
export async function getUsers(params: {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  banned?: string;
  emailVerified?: string;
}) {
  const { page = 1, limit = 10, search, role, banned, emailVerified } = params;
  const skip = (page - 1) * limit;

  const where: Prisma.UserWhereInput = {};

  // Filter by role
  if (role && role !== "all") {
    const roleValue = role.toUpperCase() as Role;
    if (Object.values(Role).includes(roleValue)) {
      where.role = roleValue;
    }
  }

  // Filter by banned status
  if (banned && banned !== "all") {
    where.banned = banned === "true";
  }

  // Filter by email verified
  if (emailVerified && emailVerified !== "all") {
    where.emailVerified = emailVerified === "true";
  }

  // Search by name or email
  if (search && search.trim()) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        emailVerified: true,
        banned: true,
        banReason: true,
        banExpires: true,
        createdAt: true,
        _count: {
          select: {
            orders: true,
            sessions: true,
          },
        },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    data: users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// Get single user with full details
export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      sessions: {
        orderBy: { createdAt: "desc" },
      },
      orders: {
        orderBy: { createdAt: "desc" },
        take: 10,
        include: {
          productOrders: true,
          serviceOrders: true,
        },
      },
      accounts: {
        select: {
          providerId: true,
          createdAt: true,
        },
      },
      cart: {
        include: {
          items: {
            orderBy: { createdAt: "desc" },
          },
        },
      },
      _count: {
        select: {
          orders: true,
          sessions: true,
        },
      },
    },
  });

  return user;
}
// Delete user (Admin only)
export async function deleteUser(userId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (currentUser?.role !== "ADMIN") {
      return { success: false, error: "Only admins can delete users" };
    }

    // Prevent deleting yourself
    if (userId === session.user.id) {
      return { success: false, error: "Cannot delete yourself" };
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return { success: true };
  } catch (error) {
    console.error("Delete user error:", error);
    return { success: false, error: "Failed to delete user" };
  }
}
