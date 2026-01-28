/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ImageIcon, Loader2, Star, Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Cropper, type CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { useDropzone } from "react-dropzone";
import { FormError } from "./form-error";

interface ProductImage {
  id?: string;
  imageId: string;
  url: string;
  isFeatured: boolean;
  productId?: string;
}

interface MultipleImageUploaderProps {
  onImagesChange: (images: ProductImage[]) => void;
  images: ProductImage[];
  uploadPreset: string;
  aspectRatio: number;
  maxImages?: number;
  errorMsg?: string;
}

export function MultipleImageUploader({
  onImagesChange,
  images,
  aspectRatio,
  uploadPreset,
  maxImages = 5,
  errorMsg,
}: MultipleImageUploaderProps) {
  const [cropperImage, setCropperImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCropper, setShowCropper] = useState(false);
  const cropperRef = useRef<CropperRef>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (
        acceptedFiles &&
        acceptedFiles.length > 0 &&
        images.length < maxImages
      ) {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
          setCropperImage(reader.result as string);
          setShowCropper(true);
        };

        reader.readAsDataURL(file);
      }
    },
    [images.length, maxImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
    multiple: false,
    disabled: images.length >= maxImages,
  });

  const handleCropComplete = useCallback(
    async (cropper: any) => {
      const canvas = cropper.getCanvas();
      if (canvas) {
        const croppedImage = canvas.toDataURL();
        setUploading(true);

        try {
          // Simulate progress
          const progressInterval = setInterval(() => {
            setProgress((prev) => {
              if (prev >= 90) {
                clearInterval(progressInterval);
                return prev;
              }
              return prev + 10;
            });
          }, 300);

          // Convert data URL to Blob
          const blob = await (await fetch(croppedImage)).blob();
          const file = new File([blob], "cropped-image.jpg", {
            type: "image/jpeg",
          });

          // Create form data for upload
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", uploadPreset);
          const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

          // Upload directly to Cloudinary
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          const result = await response.json();

          clearInterval(progressInterval);
          setProgress(100);

          if (result.secure_url && result.public_id) {
            const newImage: ProductImage = {
              imageId: result.public_id,
              url: result.secure_url,
              isFeatured: images.length === 0, // Set as featured if it's the first image
            };

            const updatedImages = [...images, newImage];
            onImagesChange(updatedImages);
          }
        } catch (error) {
          console.error("Upload failed:", error);
        } finally {
          setTimeout(() => {
            setUploading(false);
            setProgress(0);
            setShowCropper(false);
          }, 500);
        }
      }
    },
    [images, onImagesChange, uploadPreset]
  );

  const handleRemoveImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);

    if (images[indexToRemove].isFeatured && updatedImages.length > 0) {
      updatedImages[0].isFeatured = true;
    }

    onImagesChange(updatedImages);
  };

  const handleSetFeatured = (index: number) => {
    const updatedImages = images.map((image, i) => ({
      ...image,
      isFeatured: i === index,
    }));

    onImagesChange(updatedImages);
  };

  return (
    <div className="w-full space-y-4">
      {images.length < maxImages && !showCropper && !uploading && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg h-[200px] p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-primary"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col h-full items-center justify-center gap-2">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {isDragActive
                ? "Drop the image here"
                : "Drag & drop an image here, or click to select"}
            </p>
            <p className="text-xs text-muted-foreground">
              {images.length}/{maxImages} images uploaded
            </p>
          </div>
        </div>
      )}

      {showCropper && cropperImage && !uploading && (
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Crop Image</h3>
          <Cropper
            src={cropperImage}
            className="h-[250px] rounded border"
            stencilProps={{ aspectRatio: aspectRatio }}
            ref={cropperRef}
          />
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() => setShowCropper(false)}
              variant="outline"
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                if (cropperRef.current) {
                  handleCropComplete(cropperRef.current);
                }
              }}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
      )}

      {uploading && (
        <div className="h-[200px] border-2 border-dashed w-full flex-col justify-center flex items-center">
          <p className="text-sm mb-2 flex items-center gap-2">
            <Loader2 className="animate-spin w-7 h-7 text-blue-500" />
            Uploading image...
          </p>
          <div className="px-10 w-full">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div key={image.id || `temp-${index}`} className="relative group">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden border">
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={`Uploaded image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>

              {/* Remove button */}
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemoveImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>

              {/* Featured button */}
              <Button
                type="button"
                variant={image.isFeatured ? "default" : "secondary"}
                size="sm"
                className="absolute -top-2 -left-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleSetFeatured(index)}
              >
                <Star className="h-3 w-3" />
              </Button>

              {/* Featured badge */}
              {image.isFeatured && (
                <Badge className="absolute bottom-2 left-2 text-xs">
                  Featured
                </Badge>
              )}
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && !showCropper && !uploading && (
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-muted-foreground">No images uploaded yet</p>
        </div>
      )}
      <FormError message={errorMsg} />
    </div>
  );
}
