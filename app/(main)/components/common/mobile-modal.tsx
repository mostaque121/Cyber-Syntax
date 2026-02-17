import { X as XIcon } from "lucide-react";
import { ReactNode, useEffect, useRef } from "react";

interface MobileModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function MobileModal({
  title,
  isOpen,
  onClose,
  children,
}: MobileModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

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

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div className="w-full rounded-t-2xl bg-white max-h-[90vh] overflow-y-auto shadow-lg animate-slideUpMobileModal">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold text-gray-900 text-center w-full">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-3 p-1 rounded-full hover:bg-gray-100 focus:outline-none"
            aria-label="Close"
          >
            <XIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <div className="px-4 py-2">{children}</div>
      </div>
    </div>
  );
}
