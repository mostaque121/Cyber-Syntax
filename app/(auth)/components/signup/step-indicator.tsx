import { CheckCircle } from "lucide-react";

type Step = "signup" | "otp" | "profile" | "complete";

interface StepIndicatorProps {
  currentStep: Step;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep === "signup"
              ? "bg-blue-600 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          {currentStep === "signup" ? "1" : <CheckCircle className="w-4 h-4" />}
        </div>
        <div
          className={`w-8 h-1 ${
            ["otp", "profile", "complete"].includes(currentStep)
              ? "bg-green-600"
              : "bg-gray-300"
          }`}
        />
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep === "otp"
              ? "bg-blue-600 text-white"
              : ["profile", "complete"].includes(currentStep)
              ? "bg-green-600 text-white"
              : "bg-gray-300 text-gray-600"
          }`}
        >
          {currentStep === "otp" ? (
            "2"
          ) : ["profile", "complete"].includes(currentStep) ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            "2"
          )}
        </div>
        <div
          className={`w-8 h-1 ${
            ["profile", "complete"].includes(currentStep)
              ? "bg-green-600"
              : "bg-gray-300"
          }`}
        />
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep === "profile"
              ? "bg-blue-600 text-white"
              : currentStep === "complete"
              ? "bg-green-600 text-white"
              : "bg-gray-300 text-gray-600"
          }`}
        >
          {currentStep === "profile" ? (
            "3"
          ) : currentStep === "complete" ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            "3"
          )}
        </div>
      </div>
    </div>
  );
}
