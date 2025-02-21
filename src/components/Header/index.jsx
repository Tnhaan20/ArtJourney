import { Link } from "react-router-dom"
import logo from "../../assets/ArtJourney-Logo.png"

export default function Header() {
    return (
        <header className="bg-black">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center">
                            <img 
                                src={logo} 
                                alt="ArtJourney Logo" 
                                className="h-8 w-auto"
                            />
                        </Link>
                        <nav className="hidden md:flex items-center gap-8">
                            <Link to="/" className="text-sm font-medium text-zinc-200 hover:text-white transition-colors">
                                Trang chủ
                            </Link>
                            <Link to="/library" className="text-sm font-medium text-zinc-200 hover:text-white transition-colors">
                                Thư viện
                            </Link>
                            <Link to="/challenges" className="text-sm font-medium text-zinc-200 hover:text-white transition-colors">
                                Thử thách ôn tập
                            </Link>
                            <Link to="/leaderboard" className="text-sm font-medium text-zinc-200 hover:text-white transition-colors">
                                Bảng xếp hạng
                            </Link>
                            <Link to="/blog" className="text-sm font-medium text-zinc-200 hover:text-white transition-colors">
                                Blog/Diễn đàn
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="px-4 py-2 text-sm font-medium text-zinc-200 hover:text-white transition-colors">
                            Đăng nhập
                        </Link>
                        <Link to="/register" className="px-4 py-2 text-sm font-medium bg-[#e0c068] rounded hover:bg-amber-500 transition-colors">
                            Đăng ký
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

