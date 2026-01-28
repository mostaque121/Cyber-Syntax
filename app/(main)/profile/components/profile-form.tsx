"use client";

import { LoadingButton } from "@/components/custom-ui/loading-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ProfileFormData, updateProfile } from "../actions/profile.action";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().optional(),
  phoneNumber: z.string().optional(),
  whatsappNumber: z.string().optional(),
  fullAddress: z.string().optional(),
});

interface ProfileFormProps {
  user: {
    name: string;
    email: string;
    companyName: string | null;
    phoneNumber: string | null;
    whatsappNumber: string | null;
    fullAddress: string | null;
  };
}

export function ProfileForm({ user }: ProfileFormProps) {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      companyName: user.companyName || "",
      phoneNumber: user.phoneNumber || "",
      whatsappNumber: user.whatsappNumber || "",
      fullAddress: user.fullAddress || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ProfileFormData) => updateProfile(data),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Profile updated successfully");
      } else {
        toast.error(result.error || "Failed to update profile");
      }
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  const handleSubmit = (data: ProfileFormData) => {
    mutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Information
        </CardTitle>
        <CardDescription>
          Update your personal information and contact details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input value={user.email} disabled className="bg-gray-50" />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                </p>
              </FormItem>

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+880 1XXX XXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whatsappNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+880 1XXX XXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="fullAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your complete address"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              type="submit"
              loading={mutation.isPending}
              className="bg-primary"
            >
              Save Changes
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
