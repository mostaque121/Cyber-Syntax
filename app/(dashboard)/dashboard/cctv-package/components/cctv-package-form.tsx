"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import dynamic from "next/dynamic";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { LoadingButton } from "@/components/custom-ui/loading-button";
import { MultipleImageUploader } from "@/components/custom-ui/multiple-image-uploader";
import { SlugInput } from "@/components/custom-ui/slug-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  createCctvPackage,
  updateCctvPackage,
} from "@/app/(dashboard)/actions/cctv-package-actions";
import { CctvPackageWithRelation } from "@/app/(dashboard)/types/cctvpackage.types";
import {
  CCTVPackageFormData,
  cctvPackageSchema,
} from "@/app/(dashboard)/validations/cctv-package.validation";
import { NumberInput } from "@/components/custom-ui/number-input";
import { Checkbox } from "@/components/ui/checkbox";
const QuillEditor = dynamic(
  () => import("@/components/custom-ui/rich-text-editor"),
  { ssr: false }
);

interface CctvPackageFormProps {
  item?: CctvPackageWithRelation;
  onCloseForm?: () => void;
  onSuccess?: () => void;
}

export function CctvPackageForm({
  item,
  onCloseForm,
  onSuccess,
}: CctvPackageFormProps) {
  const isEditMode = !!item;

  const form = useForm<CCTVPackageFormData>({
    resolver: zodResolver(cctvPackageSchema),
    defaultValues: {
      title: item?.title ?? "",
      inputSlug: item?.slug ?? "",
      shortDescription: item?.shortDescription ?? "",
      longDescription: item?.longDescription ?? "",
      price: item?.price ?? undefined,
      discountPercentage: item?.discountPercentage ?? undefined,
      isAvailable: item?.isAvailable ?? true,
      images: item?.images ?? [],
    },
  });

  const onSubmit = async (data: CCTVPackageFormData) => {
    const result = isEditMode
      ? await updateCctvPackage(item.id, data)
      : await createCctvPackage(data);

    if (result.success) {
      toast.success(
        `Package ${isEditMode ? "updated" : "created"} successfully.`
      );
      onCloseForm?.();
      onSuccess?.();
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Form {...form}>
      <div>
        <h3 className="text-2xl px-8 font-semibold text-center mt-4">
          {isEditMode ? "Update" : "Add"} CCTV Package
        </h3>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 md:px-8 px-4 py-8"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Title *</FormLabel>
              <FormControl>
                <Input placeholder="Enter Package title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Slug Input */}
        <FormField
          control={form.control}
          name="inputSlug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug </FormLabel>
              <FormControl>
                <SlugInput
                  initialValue={field.value}
                  onGenerate={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Short Description */}
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="Short description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Long Description */}
        <FormField
          control={form.control}
          name="longDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Long Description</FormLabel>
              <FormControl>
                <QuillEditor
                  content={field.value as string}
                  onContentChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ========== PRICING ========== */}

        <div className="grid grid-cols-1 items-start md:grid-cols-2 gap-4">
          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price *</FormLabel>
                <FormControl>
                  <NumberInput min="0" {...field} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Discount */}
          <FormField
            control={form.control}
            name="discountPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount %</FormLabel>
                <FormControl>
                  <NumberInput min="0" max="100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ========== IMAGES ========== */}

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <MultipleImageUploader
                  images={field.value}
                  onImagesChange={field.onChange}
                  uploadPreset="shakib_product"
                  maxImages={5}
                  aspectRatio={1}
                  errorMsg={form.formState.errors.images?.message}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Available */}
        <FormField
          control={form.control}
          name="isAvailable"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Mark as Availble</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCloseForm}>
            Cancel
          </Button>

          <LoadingButton type="submit" loading={form.formState.isSubmitting}>
            {isEditMode ? "Update Package" : "Add Package"}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
