import CctvPackageCard from "@/app/(main)/components/card/cctv-package-card";
import { CctvPackageItem } from "@/app/(main)/types/cctv-package.types";

interface SectionProps {
  cctvPackages: CctvPackageItem[];
}

export function CctvPackages({ cctvPackages }: SectionProps) {
  return (
    <div>
      <div className="container mx-auto px-4 md:px-8 py-8">
        <h2 className="text-[18px] pb-4 px-1 mb-4 md:text-[28px] border-b border-[#dee2e6] font-bold text-black">
          CCTV Packages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cctvPackages.map((cctvPackage) => (
            <CctvPackageCard key={cctvPackage.id} cctvPackage={cctvPackage} />
          ))}
        </div>
      </div>
    </div>
  );
}
