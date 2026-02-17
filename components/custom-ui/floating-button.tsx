"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";

export function FloatingHelpButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 flex flex-col-reverse sm:flex-col items-start gap-2">
      <div className="sm:hidden bg-white rounded-lg shadow-lg px-3 py-2 text-sm font-medium text-gray-800">
        Need Help
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 md:gap-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-3 md:px-5 py-2 md:py-3 shadow-lg hover:shadow-xl transition-all duration-200 text-sm md:text-base font-medium"
        aria-label="Help button"
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
        <span className="hidden sm:inline">Need Help</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-white text-gray-800 rounded-lg shadow-xl p-4 w-64 md:w-80 mb-2 border border-gray-200">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
          <h3 className="font-semibold mb-2 text-sm md:text-base">
            How can we help?
          </h3>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
            We&apos;re here to assist! Click the button to reach out with any
            questions or issues.
          </p>
          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
            Contact Support
          </button>
        </div>
      )}
    </div>
  );
}
