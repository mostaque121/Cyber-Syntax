"use client";

import { LoadingButton } from "@/components/custom-ui/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "../../validation/auth.validation";

interface OtpStepProps {
  onSubmit: (data: ResetPasswordFormData) => void;
  onChangeEmail: () => void;
  isLoading: boolean;
  isResending: boolean;
  countdown: number;
  onResendOtp: () => void;
}

export function OtpStep({
  onSubmit,
  onChangeEmail,
  isLoading,
  isResending,
  countdown,
  onResendOtp,
}: OtpStepProps) {
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { otp: "", newPassword: "", confirmPassword: "" },
    mode: "onBlur",
  });

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        {/* OTP Field using ShadCN Form */}
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <Label>6-digit OTP code</Label>

              <FormControl>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    {...field}
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                    className="mt-1 "
                  >
                    <InputOTPGroup>
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <Label>New password</Label>
              <FormControl>
                <Input {...field} type="password" className="mt-1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <Label>Confirm new password</Label>
              <FormControl>
                <Input {...field} type="password" className="mt-1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton type="submit" className="w-full" loading={isLoading}>
          Reset password
        </LoadingButton>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={onResendOtp}
              disabled={countdown > 0 || isResending}
              className="font-medium text-blue-600 hover:text-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {isResending ? (
                <>
                  <Loader2 className="inline mr-1 h-3 w-3 animate-spin" />
                  Sending...
                </>
              ) : countdown > 0 ? (
                `Resend in ${countdown}s`
              ) : (
                "Resend OTP"
              )}
            </button>
          </p>
          <button
            type="button"
            onClick={onChangeEmail}
            className="mt-2 text-sm text-blue-600 hover:text-blue-500 font-medium"
          >
            Change email
          </button>
        </div>
      </form>
    </Form>
  );
}
