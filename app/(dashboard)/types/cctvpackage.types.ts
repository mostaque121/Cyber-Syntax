import { Prisma } from "@/prisma/generated/prisma";
export type CctvPackageWithRelation = Prisma.CCTVPackageGetPayload<{
  include: {
    images: true;
  };
}>;
