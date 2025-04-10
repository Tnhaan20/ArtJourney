import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/ArtJourney-Logo.png";
import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import "./Header.css"; // Import the CSS file

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Add scroll event listener to detect when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to determine if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Function to generate link class based on active state
  const getLinkClass = (path) => {
    return `text-sm font-medium nav-link ${
      isActive(path)
        ? "text-primary-yellow nav-link-active"
        : "text-secondary-yellow hover:text-primary-yellow"
    } transition-all duration-300 px-4 py-2`;
  };

  return (
    <header className={`header ${isScrolled ? "header-scrolled" : "bg-primary-white"}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 h-16 items-center">
          {/* Logo - 2 cột */}
          <Link to="/" className="col-span-2 flex items-center">
            <img src={logo} alt="ArtJourney Logo" className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation - 8 cột */}
          <nav className="col-span-8 hidden md:flex items-center justify-center gap-8">
            <Link to="/library" className={getLinkClass("/library")}>
              Thư viện
            </Link>
            <Link to="/challenges" className={getLinkClass("/challenges")}>
              Thử thách ôn tập
            </Link>
            <Link to="/leaderboard" className={getLinkClass("/leaderboard")}>
              Bảng xếp hạng
            </Link>
            <Link to="/about" className={getLinkClass("/about")}>
              About Us
            </Link>
            <Link to="/community" className={getLinkClass("/community")}>
              Blog/Diễn đàn
            </Link>
          </nav>

          {/* Right Buttons - 2 cột */}
          <div className="col-span-2 hidden md:flex items-center justify-end gap-4">
            <Link
              to="/signin"
              className="px-4 py-2 text-sm font-medium text-primary-yellow hover:text-secondary-yellow transition-all duration-300 rounded"
            >
              Đăng nhập
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-medium bg-secondary-yellow text-black hover:bg-amber-500 rounded transition-all duration-300"
            >
              Đăng ký
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="col-span-10 md:hidden flex justify-end"
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
