import { Prisma } from "@/prisma/generated/prisma";
export type ProductItem = Prisma.ProductGetPayload<{
  include: { images: true };
}>;
