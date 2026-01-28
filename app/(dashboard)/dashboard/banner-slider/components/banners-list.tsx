"use client";

import { LoadingDots } from "@/components/custom-ui/loading-dots";
import { Button } from "@/components/ui/button";
import { BannerSlider } from "@/prisma/generated/prisma";
import { Edit } from "lucide-react";
import Image from "next/image";

interface BannerListProps {
  banners: BannerSlider[];
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
  className?: string;
  onEdit: (id: string) => void;
}

export default function BannersList({
  banners,
  isLoading = false,
  isError = false,
  error,
  className,
  onEdit,
}: BannerListProps) {
  if (isLoading) {
    return <LoadingDots />;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-600">
        Error loading Banner:{" "}
        {typeof error === "string" ? error : "Something went wrong."}
      </div>
    );
  }

  if (!banners || banners.length === 0) {
    return <div className="text-center py-10">No banner found.</div>;
  }

  return (
    <div
      className={`grid grid-cols-1 pb-6 md:grid-cols-2  gap-4 ${
        className || ""
      }`}
    >
      {banners.map((banner) => (
        <div
          key={banner.id}
          className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          {/* Edit button overlay */}
          <Button
            variant="ghost"
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
            onClick={() => onEdit(banner.id)}
            aria-label="Edit banner"
          >
            <Edit className="w-5 h-5 text-gray-700" />
          </Button>

          {/* Banner Image */}
          <Image
            src={banner.image}
            alt={`Banner ${banner.id}`}
            width={1280}
            height={320}
            className="w-full h-auto object-cover"
          />

          {/* Optional footer: link and status */}
          <div className="p-4 flex justify-between items-center bg-gray-50">
            {banner.link && (
              <p className="text-blue-600 underline text-sm">{banner.link}</p>
            )}
            <span
              className={`px-2 py-1 rounded text-sm font-medium ${
                banner.isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {banner.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
