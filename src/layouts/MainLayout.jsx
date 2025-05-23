import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

export default function MainLayout({ children }) {
  const location = useLocation();

  useEffect(() => {
    const scrollToTop = () => {

      // Method 2: Document scroll (fallback)
      if (document.documentElement.scrollTop > 0) {
        document.documentElement.scrollTop = 0;
      }

      if (document.body.scrollTop > 0) {
        document.body.scrollTop = 0;
      }
    };

    scrollToTop();

    // Also execute after a small delay to handle any async content loading
    const timeoutId = setTimeout(scrollToTop, 100);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Add padding-top equal to header height */}
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </div>
  );
}
