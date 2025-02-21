import { Search } from 'lucide-react'
import BG1 from '../../assets/Home-BG-1.jpg'
import sideBG from '../../assets/Side-BG.jpg'

export default function HomeGuide() {
    return (
        <div className="relative h-[calc(100vh-64px)]">
            {/* Main background with overlay */}
            <div className="absolute inset-0 bg-black/80 z-0"></div>
            <img 
                className="absolute inset-0 object-cover w-full h-full brightness-[0.3]" 
                src={BG1}
                alt="background"
            />

            {/* Content container */}
            <div className="relative z-10 container mx-auto h-full">
                <div className="flex h-full items-center">
                    {/* Left content */}
                    <div className="w-1/2 pr-8">
                        <h1 className="text-2xl text-white mb-12 leading-relaxed">
                            Nền tảng của chúng tôi cung cấp một cách tiếp cận sáng tạo để học lịch sử thông qua việc đọc sách và thực hiện thử thách tương tác.
                        </h1>

                        {/* Search box */}
                        <div className="relative mb-8">
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="w-full px-4 py-3 rounded-lg bg-white/90 text-black placeholder:text-gray-500"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        </div>

                        {/* Trial button */}
                        <button className="px-6 py-3 bg-[#e0c068] text-black font-medium rounded-lg hover:bg-amber-500 transition-colors">
                            Trải nghiệm miễn phí
                        </button>
                    </div>

                    {/* Right content - Featured Image */}
                    <div className="w-1/2 flex justify-end items-center">
                        <img 
                            src={sideBG} 
                            alt="featured art" 
                            className="w-4/5 h-[40rem] shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
