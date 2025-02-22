import { Search } from 'lucide-react'
import BG1 from '../../assets/Home-BG-1.jpg'
import sideBG from '../../assets/Side-BG.jpg'

export default function HomeGuide() {
    return (
        <div className="relative min-h-[calc(100vh-64px)] w-full overflow-hidden">
            {/* Background with overlay */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>
            <img 
                src={BG1}
                alt="background"
                className="absolute inset-0 w-full h-full object-cover brightness-[0.5]"
            />

            {/* Main content container */}
            <div className="relative z-10 container mx-auto h-full flex items-center justify-center">
                <div className="grid grid-cols-12 gap-8 h-full items-center justify-center w-full">
                    
                    {/* Left content - centered on medium screens and above */}
                    <div className="col-span-12 md:col-span-5 md:mt-10 px-5 md:px-10 md:flex md:items-center md:justify-center md:w-full">
                        <div>
                            <h1 className="text-xl md:text-2xl lg:text-3xl text-white mb-8 leading-relaxed">
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

                            <button className="px-6 py-3 bg-[#e0c068] text-black font-medium rounded-lg hover:bg-amber-500 transition-colors">
                                Trải nghiệm miễn phí
                            </button>
                        </div>
                    </div>

                    {/* Middle spacer */}
                    <div className="hidden md:block md:col-span-2"></div>

                    {/* Right content - side image, only visible on medium screens and above */}
                    <div className="hidden md:block md:col-span-5">
                        <img 
                            src={sideBG}
                            alt="side decoration"
                            className="w-full h-auto max-h-[80vh] mt-10 object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
