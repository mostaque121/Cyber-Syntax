import { CheckCircle } from "lucide-react";

type Step = "email" | "otp" | "complete";

interface StepIndicatorProps {
  currentStep: Step;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {/* Email Step */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep === "email"
              ? "bg-blue-600 text-white"
              : ["otp", "complete"].includes(currentStep)
              ? "bg-green-600 text-white"
              : "bg-gray-300 text-gray-600"
          }`}
        >
          {currentStep === "email" ? "1" : <CheckCircle className="w-4 h-4" />}
        </div>

        <div
          className={`w-8 h-1 ${
            ["otp", "complete"].includes(currentStep)
              ? "bg-green-600"
              : "bg-gray-300"
          }`}
        />

        {/* OTP Step */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep === "otp"
              ? "bg-blue-600 text-white"
              : currentStep === "complete"
              ? "bg-green-600 text-white"
              : "bg-gray-300 text-gray-600"
          }`}
        >
          {currentStep === "otp" ? (
            "2"
          ) : currentStep === "complete" ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            "2"
          )}
        </div>

        <div
          className={`w-8 h-1 ${
            currentStep === "complete" ? "bg-green-600" : "bg-gray-300"
          }`}
        />

        {/* Complete Step */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep === "complete"
              ? "bg-green-600 text-white"
              : "bg-gray-300 text-gray-600"
          }`}
        >
          {currentStep === "complete" ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            "3"
          )}
        </div>
      </div>
    </div>
  );
}
