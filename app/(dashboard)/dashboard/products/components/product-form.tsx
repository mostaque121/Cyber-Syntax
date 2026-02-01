"use client";

import {
  createProduct,
  updateProduct,
} from "@/app/(dashboard)/actions/product-actions";

import {
  ProductFormData,
  productSchema,
} from "@/app/(dashboard)/validations/product.validation";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { ProductWithRelation } from "@/app/(dashboard)/types/products.types";
import { NumberInput } from "@/components/custom-ui/number-input";
import { CategorySelector } from "../../product-category/components/category-selector";
const QuillEditor = dynamic(
  () => import("@/components/custom-ui/rich-text-editor"),
  { ssr: false },
);

interface ProductFormProps {
  item?: ProductWithRelation;
  onCloseForm?: () => void;
  onSuccess?: () => void;
}

export function ProductForm({
  item,
  onCloseForm,
  onSuccess,
}: ProductFormProps) {
  const isEditMode = !!item;

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: item?.title ?? "",
      inputSlug: item?.slug ?? "",
      brand: item?.brand ?? "",
      productType: item?.productType ?? "NEW",
      shortDescription: item?.shortDescription ?? "",
      longDescription: item?.longDescription ?? "",
      price: item?.price ?? 0,
      discountPercentage: item?.discountPercentage ?? 0,
      warranty: item?.warranty ?? "",
      isHotDeal: item?.isHotDeal ?? false,
      isAvailable: item?.isAvailable ?? true,
      isFeatured: item?.isFeatured ?? false,
      categoryId: item?.categoryId ?? "",
      images: item?.images ?? [],
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    const result = isEditMode
      ? await updateProduct(item.id, data)
      : await createProduct(data);

    if (result.success) {
      toast.success(
        `Product ${isEditMode ? "updated" : "created"} successfully.`,
      );
      onSuccess?.();
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Title *</FormLabel>
              <FormControl>
                <Input placeholder="Enter product title" {...field} />
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
        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
          {/* Brand */}
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand *</FormLabel>
                <FormControl>
                  <Input placeholder="Brand name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Type */}
          <FormField
            control={form.control}
            name="productType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Type *</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEW">New</SelectItem>
                      <SelectItem value="USED">Used</SelectItem>
                      <SelectItem value="RECONDITION">Recondition</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

          {/* Warranty */}
          <FormField
            control={form.control}
            name="warranty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Warranty</FormLabel>
                <FormControl>
                  <Input placeholder="2 year" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2 pt-5">
            {/* Hot Deal */}
            <FormField
              control={form.control}
              name="isHotDeal"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Mark as Hot Deal</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Mark as featured</FormLabel>
                  <FormMessage />
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
          </div>
        </div>

        {/* ========== CATEGORY ========== */}

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <CategorySelector
                  selectedCategoryId={field.value}
                  onCategorySelect={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* ========== IMAGES ========== */}

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
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

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCloseForm}>
            Cancel
          </Button>

          <LoadingButton type="submit" loading={form.formState.isSubmitting}>
            {isEditMode ? "Update Product" : "Add Product"}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
