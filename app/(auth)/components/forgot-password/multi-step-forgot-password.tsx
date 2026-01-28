"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";
import { ResetPasswordFormData } from "../../validation/auth.validation";

import { useOtpCountdown } from "@/hooks/use-countdown";
import { EmailStep } from "./email-step";
import { OtpStep } from "./otp-step";
import { StepIndicator } from "./step-indicator";
import { SuccessStep } from "./success-step";

type Step = "email" | "otp" | "complete";

export function MultiStepForgotPassword() {
  const { countdown, startCountdown } = useOtpCountdown(60);
  const [currentStep, setCurrentStep] = useState<Step>("email");
  const [userEmail, setUserEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  /** Clear messages */
  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  /** Handle email submission */
  const handleEmailSubmit = async ({ email }: { email: string }) => {
    try {
      clearMessages();
      setIsLoading(true);

      const { data, error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "forget-password",
      });

      if (error?.message) {
        setError(error.message);
        return;
      }

      if (data?.success) {
        setUserEmail(email);
        setSuccess("Please check your email for the OTP code.");
        setCurrentStep("otp");
      }
    } catch {
      setError("Something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /** Handle OTP verification */
  const handleOtpSubmit = async (formData: ResetPasswordFormData) => {
    try {
      clearMessages();
      setIsLoading(true);

      const { data, error } = await authClient.emailOtp.resetPassword({
        email: userEmail,
        otp: formData.otp,
        password: formData.newPassword,
      });

      if (error?.message) {
        setError(error.message);
        return;
      }

      if (data?.success) {
        setSuccess("Password reset successfully!");
        setCurrentStep("complete");
      }
    } catch {
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /** Handle OTP resend */
  const handleResendOtp = async () => {
    try {
      clearMessages();
      setIsResending(true);

      const { data, error } = await authClient.emailOtp.sendVerificationOtp({
        email: userEmail,
        type: "forget-password",
      });

      if (error?.message) setError(error.message);
      if (data?.success) {
        startCountdown();
        setSuccess("OTP resent successfully!");
      }
    } catch {
      setError("Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  /** Change email */
  const handleChangeEmail = () => {
    setCurrentStep("email");
    clearMessages();
    setUserEmail("");
  };

  /** Navigate back to login */
  const handleBackToLogin = () => {
    window.location.href = "/login";
  };

  /** Step titles & descriptions */
  const getStepTitle = () => {
    switch (currentStep) {
      case "email":
        return "Reset your password";
      case "otp":
        return "Verify OTP";
      case "complete":
        return "Success!";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case "email":
        return "Enter your email to receive a reset code";
      case "otp":
        return `We sent a code to ${userEmail}`;
      case "complete":
        return "Your password has been reset successfully";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">{getStepTitle()}</CardTitle>
            <CardDescription className="text-center">
              {getStepDescription()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StepIndicator currentStep={currentStep} />

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {currentStep === "email" && (
              <EmailStep onSubmit={handleEmailSubmit} isLoading={isLoading} />
            )}

            {currentStep === "otp" && (
              <OtpStep
                countdown={countdown}
                onSubmit={handleOtpSubmit}
                onResendOtp={handleResendOtp}
                isLoading={isLoading}
                isResending={isResending}
                onChangeEmail={handleChangeEmail}
              />
            )}

            {currentStep === "complete" && (
              <SuccessStep onBackToLogin={handleBackToLogin} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
