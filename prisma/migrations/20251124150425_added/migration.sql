-- CreateTable
CREATE TABLE "CCTVPackage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,

    CONSTRAINT "CCTVPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CCTVImage" (
    "id" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "cctvId" TEXT NOT NULL,

    CONSTRAINT "CCTVImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CCTVImage" ADD CONSTRAINT "CCTVImage_cctvId_fkey" FOREIGN KEY ("cctvId") REFERENCES "CCTVPackage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
