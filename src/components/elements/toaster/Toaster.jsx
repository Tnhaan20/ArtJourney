import { useToast } from "@/utils/Toast";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 left-4 z-[9999] flex flex-col gap-2 w-72 pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}

function Toast({ id, title, description, variant = "default", onOpenChange }) {
  const { dismiss } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Add entrance animation on mount
  useEffect(() => {
    // Small delay to ensure the initial state is applied before transition
    const enterTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(enterTimer);
  }, []);

  // Auto dismiss after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleDismiss();
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, dismiss]);

  const handleDismiss = () => {
    setIsExiting(true);
    setIsVisible(false);
    setTimeout(() => {
      dismiss(id);
    }, 300); // Allow time for exit animation
  };

  // Determine background color based on variant
  const getBgColor = () => {
    switch (variant) {
      case "success":
        return "bg-green-100 border-green-500 text-green-800";
      case "destructive":
        return "bg-red-100 border-red-500 text-red-800";
      case "warning":
        return "bg-yellow-100 border-yellow-500 text-yellow-800";
      default:
        return "bg-white border-gray-300 text-gray-800";
    }
  };

  // Determine icon color based on variant
  const getIconColor = () => {
    switch (variant) {
      case "success":
        return "text-green-600";
      case "destructive":
        return "text-red-600";
      case "warning":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div
      className={`
        ${getBgColor()} 
        border-l-4 border rounded-lg shadow-lg p-4 
        transform transition-all duration-300 ease-in-out
        pointer-events-auto
        relative
        ${
          isVisible && !isExiting
            ? "translate-x-0 opacity-100 scale-100"
            : "-translate-x-full opacity-0 scale-95"
        }
      `}
    >
      {/* Close button */}
      <button
        onClick={handleDismiss}
        className={`
          absolute top-2 right-2 p-1 rounded-full 
          hover:bg-black/10 transition-colors
          ${getIconColor()}
        `}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>

      {/* Content */}
      <div className="pr-6">
        {title && (
          <h3 className="font-semibold mb-1 text-sm leading-tight">{title}</h3>
        )}
        {description && (
          <p className="text-sm opacity-90 leading-relaxed">{description}</p>
        )}
      </div>

      {/* Progress bar for auto-dismiss */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 rounded-b-lg overflow-hidden">
        <div
          className={`
            h-full transition-all duration-[3000ms] ease-linear
            ${
              variant === "success"
                ? "bg-green-500"
                : variant === "destructive"
                ? "bg-red-500"
                : variant === "warning"
                ? "bg-yellow-500"
                : "bg-gray-500"
            }
            ${isVisible ? "w-0" : "w-full"}
          `}
        />
      </div>
    </div>
  );
}
