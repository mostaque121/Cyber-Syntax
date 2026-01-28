import { Prisma } from "@/prisma/generated/prisma";
export type CctvPackageItem = Prisma.CCTVPackageGetPayload<{
  include: { images: true };
}>;
