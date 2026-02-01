import { z } from "zod";

export const bannerSliderSchema = z.object({
  image: z.url("Image must be a valid URL"),
  imageSmall: z.url("Image must be a valid URL"),
  link: z.string("Link is required").optional(),
  isActive: z.boolean("Active status must be provided"),
});

export type BannerSliderInput = z.infer<typeof bannerSliderSchema>;
