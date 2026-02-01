"use client";

import {
  createBannerSlider,
  deleteBannerSlider,
  updateBannerSlider,
} from "@/app/(dashboard)/actions/banner-slider";
import {
  BannerSliderInput,
  bannerSliderSchema,
} from "@/app/(dashboard)/validations/banner.validation";
import { DeleteDialog } from "@/components/custom-ui/delete-dialog";
import { ImageUploaderClient } from "@/components/custom-ui/ImageUploaderClient";
import { LoadingButton } from "@/components/custom-ui/loading-button";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BannerSlider } from "@/prisma/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type BannerSliderFormProps = {
  item?: BannerSlider;
  onSuccess?: () => void;
  onOpenChange?: (open: boolean) => void;
};

export function BannerSliderForm({
  item,
  onSuccess,
  onOpenChange,
}: BannerSliderFormProps) {
  const isEditMode = !!item?.id;
  const form = useForm<z.infer<typeof bannerSliderSchema>>({
    resolver: zodResolver(bannerSliderSchema),
    defaultValues: {
      image: item?.image || "",
      link: item?.link || "",
      isActive: item?.isActive ?? true,
      imageSmall: item?.imageSmall || "",
    },
  });
  const mutation = useMutation({
    mutationFn: async ({ data }: { data: BannerSliderInput }) => {
      if (isEditMode) {
        return await updateBannerSlider(item.id, data);
      }

      return await createBannerSlider(data);
    },

    onSuccess: () => {
      toast.success("Banner saved successfully");
      form.reset();
      onSuccess?.();
    },
    onError: () => toast.error("Failed to save banner"),
  });

  const onSubmit = (data: BannerSliderInput) => {
    mutation.mutate({ data });
  };

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBannerSlider(id),
    onSuccess: () => {
      toast.success("Deleted successfully");
      onSuccess?.();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to delete Banner");
    },
  });

  const onDelete = () => {
    if (isEditMode) deleteMutation.mutate(item.id);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <ImageUploaderClient
                  aspectRatio={4}
                  uploadPreset="banner"
                  initialImage={field.value}
                  onImageUploaded={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Image URL */}
        <FormField
          control={form.control}
          name="imageSmall"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image For Mobile</FormLabel>
              <FormControl>
                <ImageUploaderClient
                  aspectRatio={3 / 2}
                  uploadPreset="banner_for_phone"
                  initialImage={field.value}
                  onImageUploaded={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Link */}
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter link URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Active */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="mb-0">Active</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-4">
          {isEditMode && (
            <DeleteDialog
              title={`Delete Banner?`}
              description={`Are you sure you want to permanently delete this banner? This action cannot be undone.`}
              onConfirm={onDelete}
            >
              <LoadingButton
                type="button"
                variant="destructive"
                loading={deleteMutation.isPending}
              >
                Delete
              </LoadingButton>
            </DeleteDialog>
          )}

          <div className="flex items-center ml-auto gap-4 ">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange?.(false)}
            >
              Cancel
            </Button>

            <LoadingButton type="submit" loading={mutation.isPending}>
              {isEditMode ? "Update Banner" : "Create Banner"}
            </LoadingButton>
          </div>
        </div>
      </form>
    </Form>
  );
}
