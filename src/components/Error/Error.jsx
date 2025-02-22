import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#343434]">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold text-gray-200 mt-4">Trang không tồn tại</h2>
        <p className="text-gray-400 mt-2 mb-8">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary text-primary-black font-medium rounded-lg hover:bg-amber-500 transition-colors"
        >
          Trở về trang chủ
        </Link>
      </div>
    </div>
  );
}