"use client";
import Image from "next/image";
import { useState } from "react";

interface ProductImage {
  id: string;
  url: string;
  isFeatured: boolean;
}

interface SectionProps {
  images: ProductImage[];
}

export function ProductImages({ images }: SectionProps) {
  const [selectedImage, setSelectedImage] = useState<ProductImage>(
    images.find((img) => img.isFeatured) || images[0]
  );

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col w-full md:w-[41.67%] gap-4">
      {/* Main Image */}
      <div className="relative overflow-hidden bg-white rounded-lg p-4 shadow-sm flex items-center justify-center">
        <Image
          src={selectedImage.url}
          alt="Product image"
          width={1000}
          height={1000}
          className="w-full rounded-lg aspect-square object-contain"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center gap-2 overflow-x-auto">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={`
              w-24 h-24 rounded-lg border-2 p-1 cursor-pointer overflow-hidden shrink-0 group transition-transform hover:border-primary
              ${
                selectedImage.id === image.id
                  ? "border-primary"
                  : "border-gray-200"
              }
            `}
          >
            <Image
              src={image.url}
              alt={`Thumbnail ${image.id}`}
              width={80}
              height={80}
              className="w-full h-full group-hover:scale-[1.2]  transition-all duration-300 object-contain rounded-md"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
