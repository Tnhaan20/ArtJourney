import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import logo from "../../assets/ArtJourney-Logo.png"
import { useState } from "react"
import MobileMenu from "./MobileMenu"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-black relative z-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-12 h-16 items-center">
                    {/* Logo - 2 cột */}
                    <Link to="/" className="col-span-2 flex items-center">
                        <img 
                            src={logo} 
                            alt="ArtJourney Logo" 
                            className="h-8 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation - 8 cột */}
                    <nav className="col-span-8 hidden md:flex items-center justify-center gap-8">
                        
                        <Link 
                            to="/library" 
                            className="text-sm font-medium text-white hover:text-[#e0c068] transition-all duration-300 hover:shadow-[0_0_15px_#e0c068] px-4 py-2 rounded"
                        >
                            Thư viện
                        </Link>
                        <Link 
                            to="/challenges" 
                            className="text-sm font-medium text-white hover:text-[#e0c068] transition-all duration-300 hover:shadow-[0_0_15px_#e0c068] px-4 py-2 rounded"
                        >
                            Thử thách ôn tập
                        </Link>
                        <Link 
                            to="/leaderboard" 
                            className="text-sm font-medium text-white hover:text-[#e0c068] transition-all duration-300 hover:shadow-[0_0_15px_#e0c068] px-4 py-2 rounded"
                        >
                            Bảng xếp hạng
                        </Link>
                        <Link 
                            to="/about" 
                            className="text-sm font-medium text-white hover:text-[#e0c068] transition-all duration-300 hover:shadow-[0_0_15px_#e0c068] px-4 py-2 rounded"
                        >
                            About Us
                        </Link>
                        <Link 
                            to="/blog" 
                            className="text-sm font-medium text-white hover:text-[#e0c068] transition-all duration-300 hover:shadow-[0_0_15px_#e0c068] px-4 py-2 rounded"
                        >
                            Blog/Diễn đàn
                        </Link>
                    </nav>

                    {/* Right Buttons - 2 cột */}
                    <div className="col-span-2 hidden md:flex items-center justify-end gap-4">
                        <Link 
                            to="/signin" 
                            className="px-4 py-2 text-sm font-medium text-white hover:text-[#e0c068] transition-all duration-300 hover:shadow-[0_0_15px_#e0c068] rounded"
                        >
                            Đăng nhập
                        </Link>
                        <Link 
                            to="/signup" 
                            className="px-4 py-2 text-sm font-medium bg-[#e0c068] text-black hover:bg-amber-500 rounded transition-all duration-300 hover:shadow-[0_0_15px_#e0c068]"
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
                            <X className="text-white" size={24} />
                        ) : (
                            <Menu className="text-white" size={24} />
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
    )
}

