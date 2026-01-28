"use client";

import { LoadingButton } from "@/components/custom-ui/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { otpSchema } from "../../validation/auth.validation";

type OtpFormData = z.infer<typeof otpSchema>;

interface OtpVerificationProps {
  email: string;
  onSubmit: (otp: OtpFormData) => void;
  onChangeEmail: () => void;
  onResendOtp: () => Promise<void>;
  isLoading: boolean;
  isResending: boolean;
}

export function OtpVerification({
  email,
  onSubmit,
  onChangeEmail,
  onResendOtp,
  isLoading,
  isResending,
}: OtpVerificationProps) {
  const [countdown, setCountdown] = useState(0);

  const form = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  // countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // resend with countdown
  const handleResend = async () => {
    await onResendOtp();
    setCountdown(30);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Change email */}
        <button
          type="button"
          onClick={onChangeEmail}
          className="text-sm text-blue-600 hover:text-blue-500 font-medium"
        >
          Change email
        </button>

        {/* Email display */}
        <div>
          <Label>Email address</Label>
          <div className="mt-1 bg-gray-50 px-3 py-2 rounded-md border text-sm text-gray-700">
            {email}
          </div>
        </div>

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

        {/* Verify button */}
        <LoadingButton loading={isLoading} type="submit" className="w-full">
          Verify OTP
        </LoadingButton>

        {/* Resend OTP */}
        <p className="text-center text-sm text-gray-600">
          Didn’t receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0 || isResending}
            className="font-medium text-blue-600 hover:text-blue-500 disabled:text-gray-400"
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
      </form>
    </Form>
  );
}
