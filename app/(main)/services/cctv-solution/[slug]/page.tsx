import {
  getAllCctvPackages,
  getCctvPackageBySlug,
} from "@/app/(main)/actions/cctv-package-actions";
import { notFound } from "next/navigation";
import "react-quill-new/dist/quill.snow.css";
import { CctvPackageBreadcrumb } from "./components/cctvpackage-bredcrumb";
import { CctvPackageDetails } from "./components/cctvpackage-details";
import { CctvPackageImages } from "./components/cctvpackage-images";
// Generate static params for all CCTV packages
export async function generateStaticParams() {
  const packages = await getAllCctvPackages();

  return packages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export default async function CctvPackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cctvPackage = await getCctvPackageBySlug({ slug });
  if (!cctvPackage) {
    notFound();
  }

  return (
    <div className="container px-4 md:px-8 mx-auto py-3">
      <CctvPackageBreadcrumb title={cctvPackage.title} />
      <div className="flex flex-col md:flex-row gap-8">
        <CctvPackageImages images={cctvPackage.images} />
        <CctvPackageDetails
          title={cctvPackage.title}
          shortDescription={cctvPackage.shortDescription}
          price={cctvPackage.price}
          discountPercentage={cctvPackage.discountPercentage}
        />
      </div>
      <div
        className="py-16! ql-editor"
        dangerouslySetInnerHTML={{ __html: cctvPackage.longDescription }}
      />
    </div>
  );
}
