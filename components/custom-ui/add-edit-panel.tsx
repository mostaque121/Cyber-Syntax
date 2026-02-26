"use client";

import { X as XIcon } from "lucide-react";
import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  disableOutsideClick?: boolean;
  disableEscapeKey?: boolean;
  maxWidth?: string;
}

export default function AddEditPanel({
  title,
  children,
  isOpen,
  onClose,
  disableOutsideClick = false,
  disableEscapeKey = false,
  maxWidth = "700px",
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || disableEscapeKey) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, disableEscapeKey]);

  // Close when clicking on the overlay backdrop only (more robust)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disableOutsideClick) return;
    // Only close if the click is directly on the overlay, not on modal content or children
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 overflow-y-auto bg-[rgba(244,244,244,0.8)] flex justify-center items-start py-10"
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
    >
      {/* Modal content */}
      <div
        ref={modalRef}
        style={{ maxWidth }}
        className="relative w-full shrink-0 flex flex-col bg-white shadow-custom rounded-[12px] pointer-events-auto"
        onClick={(e) => e.stopPropagation()} // Prevent modal content clicks from bubbling to overlay
      >
        {/* Header */}
        <div className="px-4 pb-3 pt-6 border-b border-black/10 flex justify-center items-center relative">
          <h2 className="text-[20px] font-bold text-center text-[#080809] leading-[1.2]">
            {title}
          </h2>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 hover:bg-black/10 rounded-full transition-colors"
            aria-label="Close"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}
