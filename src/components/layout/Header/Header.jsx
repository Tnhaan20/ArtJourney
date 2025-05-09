import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  UserCircle,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "@/components/elements/LanguageSwitcher/LanguageSwitcher";
import { useAppTranslation } from "@/contexts/TranslationContext";
import "./Header.css"; // Import the CSS file
import { TailwindStyle } from "@/utils/Enum";
import HightlightText from "@/components/elements/hightlight-text/Text";
import { assets } from "@/assets/assets";
import { useAuthStore } from "@/domains/store/use-auth-store";

export default function Header() {
  const { t } = useAppTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, role, logout } = useAuthStore();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

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

  const handleLogout = async () => {
    await logout();
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
            {/* Auth Buttons or User Profile */}
            {isAuthenticated ? (
              <div className="relative" ref={profileMenuRef}>
                <div
                  className={`flex items-center gap-2 ${TailwindStyle.GLASSMORPHISM} px-3 py-1.5 rounded-full cursor-pointer`}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <div className="flex items-center">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-6 h-6 object-cover "
                      />
                    ) : (
                      <UserCircle size={2} className="text-primary-yellow" />
                    )}
                    {/* <div className="flex flex-col">
                      <span className="text-sm font-medium text-primary-blue">
                        {user?.name || "User"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {role}
                      </span>
                    </div> */}
                    <ChevronDown
                      size={16}
                      className={`text-gray-500 transition-transform ${
                        showProfileMenu ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Profile Dropdown Menu */}
                {showProfileMenu && (
                  <div
                    className={`absolute mt-2 w-48 ${TailwindStyle.GLASSMORPHISM} transform -translate-x-1/2 left-1/2 rounded-xl shadow-lg overflow-hidden z-50`}
                  >
                    <div className="flex flex-col">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-white/10 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <User size={18} />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        to="/settings"
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-white/10 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <Settings size={18} className="text-gray-600" />
                        <span>Settings</span>
                      </Link>

                      <button
                        onClick={async () => {
                          await handleLogout();
                          setShowProfileMenu(false);
                        }}
                        className="flex items-center cursor-pointer gap-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50/10 transition-colors w-full text-left"
                      >
                        <LogOut size={18} />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
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
            )}
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
            isAuthenticated={isAuthenticated}
            user={user}
            role={role}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
}
