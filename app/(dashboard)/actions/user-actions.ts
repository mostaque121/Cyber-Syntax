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

// Update user role (Admin only)
export async function updateUserRole(userId: string, newRole: Role) {
  try {
    // Get current session to check permissions
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    // Only Admin can change roles
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (currentUser?.role !== "ADMIN") {
      return { success: false, error: "Only admins can change user roles" };
    }

    // Prevent changing own role
    if (userId === session.user.id) {
      return { success: false, error: "Cannot change your own role" };
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    return { success: true, data: user };
  } catch (error) {
    console.error("Update user role error:", error);
    return { success: false, error: "Failed to update user role" };
  }
}

// Ban user (Admin and Moderator)
export async function banUser(
  userId: string,
  banReason: string,
  banExpires?: Date
) {
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

    // Only Admin and Moderator can ban users
    if (currentUser?.role !== "ADMIN" && currentUser?.role !== "MODERATOR") {
      return { success: false, error: "Insufficient permissions" };
    }

    // Prevent banning yourself
    if (userId === session.user.id) {
      return { success: false, error: "Cannot ban yourself" };
    }

    // Check target user role - can't ban admin
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (targetUser?.role === "ADMIN") {
      return { success: false, error: "Cannot ban an admin" };
    }

    // Moderators can't ban other moderators
    if (currentUser?.role === "MODERATOR" && targetUser?.role === "MODERATOR") {
      return {
        success: false,
        error: "Moderators cannot ban other moderators",
      };
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        banned: true,
        banReason,
        banExpires: banExpires || null,
      },
    });

    // Invalidate all sessions for banned user
    await prisma.session.deleteMany({
      where: { userId },
    });

    return { success: true, data: user };
  } catch (error) {
    console.error("Ban user error:", error);
    return { success: false, error: "Failed to ban user" };
  }
}

// Unban user
export async function unbanUser(userId: string) {
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

    if (currentUser?.role !== "ADMIN" && currentUser?.role !== "MODERATOR") {
      return { success: false, error: "Insufficient permissions" };
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        banned: false,
        banReason: null,
        banExpires: null,
      },
    });

    return { success: true, data: user };
  } catch (error) {
    console.error("Unban user error:", error);
    return { success: false, error: "Failed to unban user" };
  }
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

// Revoke a session
export async function revokeSession(sessionId: string) {
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

    if (currentUser?.role !== "ADMIN" && currentUser?.role !== "MODERATOR") {
      return { success: false, error: "Insufficient permissions" };
    }

    await prisma.session.delete({
      where: { id: sessionId },
    });

    return { success: true };
  } catch (error) {
    console.error("Revoke session error:", error);
    return { success: false, error: "Failed to revoke session" };
  }
}

// Revoke all sessions for a user
export async function revokeAllSessions(userId: string) {
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

    if (currentUser?.role !== "ADMIN" && currentUser?.role !== "MODERATOR") {
      return { success: false, error: "Insufficient permissions" };
    }

    await prisma.session.deleteMany({
      where: { userId },
    });

    return { success: true };
  } catch (error) {
    console.error("Revoke all sessions error:", error);
    return { success: false, error: "Failed to revoke sessions" };
  }
}
