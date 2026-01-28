import { Prisma } from "@/prisma/generated/prisma";
export type ProductWithRelation = Prisma.ProductGetPayload<{
  include: {
    category: true;
    images: true;
  };
}>;
