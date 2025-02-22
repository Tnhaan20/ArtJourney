import { Link } from "react-router-dom"

export default function MobileMenu({ isOpen, onClose }) {
    if (!isOpen) return null;
    
    return (
        <div className="absolute top-16 left-0 right-0 bg-black border-t border-gray-800 md:hidden">
            <div className="flex flex-col p-4 gap-4">
                
                <Link 
                    to="/library" 
                    className="text-sm font-medium text-white hover:text-[#e0c068] transition-all duration-300"
                    onClick={onClose}
                >
                    Thư viện
                </Link>
                <Link 
                    to="/challenges" 
                    className="text-sm font-medium text-white hover:text-[#e0c068] transition-all duration-300"
                    onClick={onClose}
                >
                    Thử thách ôn tập
                </Link>
                <Link 
                    to="/leaderboard" 
                    className="text-sm font-medium text-white hover:text-[#e0c068] transition-all duration-300"
                    onClick={onClose}
                >
                    Bảng xếp hạng
                </Link>
                <Link 
                    to="/blog" 
                    className="text-sm font-medium text-white hover:text-[#e0c068] transition-all duration-300"
                    onClick={onClose}
                >
                    Blog/Diễn đàn
                </Link>
                <div className="flex flex-col gap-4 pt-4 border-t border-gray-800">
                    <Link 
                        to="/signin" 
                        className="text-sm font-medium text-white hover:text-[#e0c068] transition-all duration-300"
                        onClick={onClose}
                    >
                        Đăng nhập
                    </Link>
                    <Link 
                        to="/signup" 
                        className="text-sm font-medium bg-[#e0c068] text-black hover:bg-amber-500 rounded py-2 text-center transition-all duration-300"
                        onClick={onClose}
                    >
                        Đăng ký
                    </Link>
                </div>
            </div>
        </div>
    )
}
