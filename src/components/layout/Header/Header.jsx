import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "@/components/elements/LanguageSwitcher/LanguageSwitcher";
import { useAppTranslation } from "@/contexts/TranslationContext";
import "./Header.css"; // Import the CSS file
import { TailwindStyle } from "@/utils/Enum";
import HightlightText from "@/components/elements/hightlight-text/Text";
import { assets } from "@/assets/assets";

export default function Header() {
  const { t } = useAppTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Add scroll event listener to detect when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      // Use window.scrollY as the primary way to detect scrolling
      const scrollPosition = window.scrollY;

      if (scrollPosition > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Initial check on component mount
    handleScroll();

    // Add event listener for scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to determine if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Function to generate link class based on active state
  const getLinkClass = (path) => {
    return `text-sm font-medium relative group ${
      isActive(path)
        ? "text-primary-blue font-semibold nav-link-active"
        : "text-primary-blue hover:text-secondary-blue"
    } transition-all duration-300 px-4 py-2`;
  };

  return (
    <header className="absolute z-50 w-full px-4 md:px-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo with text */}
          <Link to="/" className={`px-3 ${TailwindStyle.GLASSMORPHISM}`}>
            <img
              src={assets.main_logo.artjourney_logo}
              alt="ArtJourney Logo"
              className="h-8 w-auto mr-2"
            />
            <span className="font-medium text-primary-yellow">ArtJourney</span>
          </Link>

          {/* Navigation - centered */}
          <nav className={`${TailwindStyle.GLASSMORPHISM} mx-auto`}>
            <HightlightText to="/learn" className={getLinkClass("/learn")}>
              {t("header.learn")}
            </HightlightText>
            <HightlightText to="/ranking" className={getLinkClass("/ranking")}>
              {t("header.ranking")}
            </HightlightText>
            <HightlightText to="/about" className={getLinkClass("/about")}>
              {t("header.aboutUs")}
            </HightlightText>
            <HightlightText
              to="/community"
              className={getLinkClass("/community")}
            >
              {t("header.community")}
            </HightlightText>
          </nav>

          <div className="w-auto hidden md:flex items-center gap-2 pr-3">
            {/* Auth Buttons */}
            <div
              className={`flex items-center gap-1 rounded-full px-1 py-0.5 justify-between ${TailwindStyle.GLASSMORPHISM}`}
            >
              <HightlightText
                to="/signup"
                className="px-4 py-1.5 text-sm font-medium hover:text-secondary-blue text-black transition-all duration-300 rounded-l-full bg-white border border-white/50 shadow-lg shadow-gray-800/5 ring-1 ring-gray-800/[.075] backdrop-blur-xl"
              >
                {t("header.signUp")}
              </HightlightText>

              <Link
                to="/signin"
                className="px-4 py-1.5 text-sm font-medium text-[#753f09] transition-all duration-300 rounded-r-full bg-gradient-to-r from-[#FCC059] to-[#F7D368] border border-white/50 shadow-lg shadow-gray-800/5 ring-1 ring-gray-800/[.075] backdrop-blur-xl"
              >
                {t("header.logIn")}
              </Link>
            </div>

            {/* Language Switcher - circular and independent */}
          </div>
          <div
            className={`${TailwindStyle.GLASSMORPHISM} flex items-center justify-center z-50 p-0 aspect-square cursor-pointer `}
          >
            <LanguageSwitcher />
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="text-primary-yellow" size={24} />
            ) : (
              <Menu className="text-primary-yellow" size={24} />
            )}
          </button>

          {/* Mobile Menu Component */}
          <MobileMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}
