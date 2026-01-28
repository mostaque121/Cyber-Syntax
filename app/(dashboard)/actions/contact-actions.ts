"use server";

import { prisma } from "@/lib/prisma";
import { ContactStatus, Prisma } from "@/prisma/generated/prisma";

export type ContactSubmissionWithPagination = Awaited<
  ReturnType<typeof getContactSubmissions>
>;

export async function getContactSubmissions(params: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) {
  const { page = 1, limit = 10, status, search } = params;
  const skip = (page - 1) * limit;

  const where: Prisma.ContactSubmissionWhereInput = {};

  // Filter by status
  if (status && status !== "all") {
    const statusValue = status.toUpperCase() as ContactStatus;
    if (Object.values(ContactStatus).includes(statusValue)) {
      where.status = statusValue;
    }
  }

  // Search by name or email
  if (search && search.trim()) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const [submissions, total] = await Promise.all([
    prisma.contactSubmission.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.contactSubmission.count({ where }),
  ]);

  return {
    data: submissions,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getContactSubmissionById(id: string) {
  return prisma.contactSubmission.findUnique({
    where: { id },
  });
}

export async function updateContactStatus(id: string, status: ContactStatus) {
  try {
    const submission = await prisma.contactSubmission.update({
      where: { id },
      data: { status },
    });

    return {
      success: true,
      data: submission,
    };
  } catch (error) {
    console.error("Update contact status error:", error);
    return {
      success: false,
      error: "Failed to update status",
    };
  }
}

export async function deleteContactSubmission(id: string) {
  try {
    await prisma.contactSubmission.delete({
      where: { id },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Delete contact submission error:", error);
    return {
      success: false,
      error: "Failed to delete submission",
    };
  }
}
