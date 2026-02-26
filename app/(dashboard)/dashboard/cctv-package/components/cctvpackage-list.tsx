"use client";

import { CctvPackageWithRelation } from "@/app/(dashboard)/types/cctvpackage.types";
import { LoadingDots } from "@/components/custom-ui/loading-dots";
import { DashboardCctvPackageCard } from "./cctvpackage-card";

interface ProductListProps {
  cctvPackages: CctvPackageWithRelation[];
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
  className?: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  deletingId: string | null;
}

export default function DashboardCctvPackageList({
  cctvPackages,
  isLoading = false,
  isError = false,
  error,
  className,
  onEdit,
  onDelete,
  deletingId,
}: ProductListProps) {
  if (isLoading) {
    return <LoadingDots />;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-600">
        Error loading package:{" "}
        {typeof error === "string" ? error : "Something went wrong."}
      </div>
    );
  }

  if (!cctvPackages || cctvPackages.length === 0) {
    return <div className="text-center py-10">No package found.</div>;
  }

  return (
    <div
      className={`grid grid-cols-1 pb-6 md:grid-cols-2 lg:grid-cols-4 gap-4 ${
        className || ""
      }`}
    >
      {cctvPackages.map((cctvPackage) => (
        <DashboardCctvPackageCard
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={deletingId === cctvPackage.id}
          key={cctvPackage.id}
          cctvPackage={cctvPackage}
        />
      ))}
    </div>
  );
}
