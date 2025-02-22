import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Logo from '../../assets/ArtJourney-Logo.png';
import GoogleIcon from '../../assets/google.svg';
import SideImg from '../../assets/juliar.png';
export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập
  };

  const handleGoogleSignIn = () => {
    // Xử lý đăng nhập với Google
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      {/* Container chứa 2 cột, background dark #343434 */}
      <div className="flex w-full max-w-5xl rounded-lg shadow-lg overflow-hidden bg-[#3a3838]">
        {/* Cột đăng nhập (nằm bên trái) */}
        <div className="w-full md:w-2/3 p-8">
           <div className="flex items-center justify-center">
            <Link to="/">
              <img className="h-20" src={Logo} alt="Logo" />
            </Link>
            <div className="border-l border-primary mx-5 h-12"></div>
            <span className="text-gray-300 font-bold text-3xl text-primary">Đăng nhập</span>
          </div>
          {/* Phần "Chào mừng bạn trở lại" nằm bên dưới header */}
          <div className="text-center mt-2">
            <p className="text-gray-300">Chào mừng bạn trở lại</p>
          </div>


          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Mật khẩu
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-500 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-200">
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <Link to="/" className="text-sm font-medium text-gray-200 hover:text-primary-dark">
                Quên mật khẩu?
              </Link>
            </div>

            {/* Nút Đăng nhập */}
            <button
              type="submit"
              className="w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-black bg-[#e0c068] hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Đăng nhập
            </button>
                      <div className="flex items-center w-full">
            <div className="border-t border-gray-400 flex-grow mr-3"></div>
            <span className="text-gray-400">hoặc</span>
            <div className="border-t border-gray-400 flex-grow ml-3"></div>
          </div>
            {/* Đăng nhập với Google */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full cursor-pointer mb-4 flex items-center justify-center gap-2 py-2 px-4 border border-gray-500 rounded-md shadow-sm text-sm font-medium text-gray-200"
            >
              <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
              Đăng nhập với Google
            </button>

            {/* Link Đăng ký */}
            <p className="text-center text-sm text-gray-300">
              Chưa có tài khoản?{' '}
              <Link to="/signup" className="font-medium text-[#e0c068] hover:text-amber-500">
                Đăng ký ngay
              </Link>
            </p>
          </form>
        </div>

        {/* Cột giới thiệu (nằm bên phải) */}
        <div className="hidden md:flex w-full md:w-1/3 p-8 border-l border-gray-500 items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Chào mừng bạn đến với ArtJourney
            </h2>
            <p className="text-gray-300 mb-6">
              Hãy bắt đầu hành trình học tập của bạn với nền tảng đầy đủ tính năng và tài nguyên phong phú.
            </p>
            <button className="px-6 py-3 bg-[#e0c068] text-primary-black font-medium rounded-lg hover:bg-amber-500 transition-colors">
              Bắt đầu học miễn phí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
