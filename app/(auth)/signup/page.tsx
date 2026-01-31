"use client";

import { useState } from "react";
import { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

import {
  otpSchema,
  ProfileFormData,
  signupSchema,
} from "@/app/(auth)/validation/auth.validation";
import { addProfile } from "../action/auth.action";
import { CompletionStep } from "../components/signup/completion-step";
import { OtpVerification } from "../components/signup/otp-verification";
import { ProfileForm } from "../components/signup/profile-form";
import { SignupForm } from "../components/signup/signup-form";
import { StepIndicator } from "../components/signup/step-indicator";

type Step = "signup" | "otp" | "profile" | "complete";

type SignupFormData = z.infer<typeof signupSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

export default function MultiStepSignup() {
  const [currentStep, setCurrentStep] = useState<Step>("signup");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setsetIsGoogleIsLoading] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);

  /** Clear messages */
  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  /** Handle signup submission */
  const handleSignup = async (formData: SignupFormData) => {
    try {
      clearMessages();
      setIsLoading(true);

      const { data, error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "CUSTOMER",
      });

      if (error?.message) {
        setError(error.message);
      }

      if (data?.user.email) {
        setUserEmail(data.user.email);
        setSuccess(
          "Please check your email for the OTP code to complete registration.",
        );
        setCurrentStep("otp");
      }
    } catch {
      setError("Something went wrong! Please try again.");
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
        type: "email-verification",
      });

      if (data?.success) {
        setSuccess(
          "Please check your email for the OTP code to complete registration.",
        );
      }

      if (error?.message) {
        setError(error.message);
      }
    } catch {
      setError("Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  /** Handle OTP verification */
  const handleOtpSubmit = async (formData: OtpFormData) => {
    try {
      clearMessages();
      setIsLoading(true);

      const { data, error } = await authClient.emailOtp.verifyEmail({
        email: userEmail,
        otp: formData.otp,
      });

      if (error?.message) {
        setError(error.message);
        return;
      }

      if (data?.status) {
        setCurrentStep("profile");
      }
    } catch {
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /** Handle profile submission */
  const handleProfileSubmit = async (formData: ProfileFormData) => {
    try {
      clearMessages();
      setIsLoading(true);

      const { data, error } = await addProfile(userEmail, formData);

      if (error) {
        setError(error);
        return;
      }

      if (data?.user) {
        setSuccess(data.message ?? "Profile added successfully!");
        setCurrentStep("complete");
      }
    } catch {
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setsetIsGoogleIsLoading(true);
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      if (error) {
        setError(error.message ?? "An Unknown error. Please try again.");
        return;
      }
    } catch {
      setError("An error occurred with Google sign in");
      setsetIsGoogleIsLoading(false);
    }
  };

  /** Skip profile step */
  const handleSkipProfile = () => {
    setCurrentStep("complete");
  };

  /** Change email from OTP step */
  const handleChangeEmail = () => {
    setCurrentStep("signup");
    clearMessages();
    setUserEmail("");
  };

  /** Step titles and descriptions */
  const getStepTitle = () => {
    switch (currentStep) {
      case "signup":
        return "Create your account";
      case "otp":
        return "Verify your email";
      case "profile":
        return "Complete your profile";
      case "complete":
        return "Welcome aboard!";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case "signup":
        return "Sign up to get started";
      case "otp":
        return `We sent a code to ${userEmail}`;
      case "profile":
        return "Add your business information (optional)";
      case "complete":
        return "Your account has been created successfully";
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

            {currentStep === "signup" && (
              <SignupForm
                onSignup={handleSignup}
                isLoading={isLoading}
                isGoogleLoading={isGoogleLoading}
                onGoogleSignup={handleGoogleSignIn}
              />
            )}

            {currentStep === "otp" && userEmail && (
              <OtpVerification
                email={userEmail}
                onSubmit={handleOtpSubmit}
                onResendOtp={handleResendOtp}
                isLoading={isLoading}
                isResending={isResending}
                onChangeEmail={handleChangeEmail}
              />
            )}

            {currentStep === "profile" && (
              <ProfileForm
                onSubmit={handleProfileSubmit}
                isLoading={isLoading}
                onSkip={handleSkipProfile}
              />
            )}

            {currentStep === "complete" && <CompletionStep />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
