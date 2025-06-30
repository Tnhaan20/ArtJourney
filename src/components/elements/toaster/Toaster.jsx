import { useToast } from "@/utils/Toast";
import { useEffect, useState } from "react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 left-4 z-40 flex flex-col gap-2 w-72">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}

function Toast({ id, title, description, variant = "default", onOpenChange }) {
  const { dismiss } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  
  // Add entrance animation on mount
  useEffect(() => {
    // Small delay to ensure the initial state is applied before transition
    const enterTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    
    return () => clearTimeout(enterTimer);
  }, []);

  // Auto dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        dismiss(id);
      }, 300); // Allow time for exit animation
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, dismiss]);

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

  return (
    <div
      className={`${getBgColor()} border rounded-md shadow-md p-4 transform transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      {title && <h3 className="font-semibold mb-1">{title}</h3>}
      {description && <p className="text-sm">{description}</p>}
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => dismiss(id), 300);
        }}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ×
      </button>
    </div>
  );
}
