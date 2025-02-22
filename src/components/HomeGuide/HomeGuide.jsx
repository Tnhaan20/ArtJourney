import { Search } from 'lucide-react'
import BG1 from '../../assets/Home-BG-1.jpg'
import sideBG from '../../assets/Side-BG.jpg'

export default function HomeGuide() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full overflow-hidden">
      {/* Overlay mờ đen và hình nền */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <img
        src={BG1}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover brightness-[0.5]"
      />

      {/* Container chính - dùng flex để căn giữa toàn bộ */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
        {/* Grid 2 cột, 1 cột trên mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-center">
          {/* Cột bên trái (nội dung) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Nền tảng học lịch sử sáng tạo
            </h1>
            <p className="text-white mb-6 max-w-md">
              Chúng tôi mang đến trải nghiệm học lịch sử qua việc đọc sách và thực hiện thử thách tương tác. 
              Tìm hiểu ngay để khám phá kho tàng tri thức!
            </p>

            {/* Ô tìm kiếm */}
            <div className="relative w-full max-w-md mb-6">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full px-4 py-3 rounded-lg bg-white/90 text-black placeholder:text-gray-500"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            </div>

            {/* Nút bấm */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-[#e0c068] text-black font-medium rounded-lg hover:bg-amber-500 transition-colors">
                Trải nghiệm miễn phí
              </button>
              
            </div>
          </div>

          {/* Cột bên phải (hình ảnh), ẩn trên mobile */}
          <div className="hidden md:block mt-10">
            <img
              src={sideBG}
              alt="side decoration"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
