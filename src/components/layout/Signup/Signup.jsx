import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Logo from "../../../assets/ArtJourney-Logo.png";
import GoogleIcon from "../../../assets/google.svg";
import SideBG from "../../../assets/SideBGSignIn.jpg"; // Make sure to add this image

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in logic here
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <div className="flex w-full max-w-5xl rounded-lg shadow-lg overflow-hidden bg-[#3a3838]">
        {/* Form bên phải */}
        <div className="w-full md:w-2/3 p-8">
          <div className="flex items-center justify-center">
            <Link to="/">
              <img className="h-20" src={Logo} alt="Logo" />
            </Link>
            <div className="border-l border-primary mx-5 h-12"></div>
            <span className="text-gray-300 font-bold text-3xl text-primary">
              Đăng ký
            </span>
          </div>

          <div className="text-center mt-2">
            <p className="text-gray-300">Tạo tài khoản mới</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200"
              >
                Mật khẩu
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-200"
              >
                Xác nhận mật khẩu
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-black bg-[#e0c068] hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Đăng ký
            </button>

            <div className="flex items-center w-full">
              <div className="border-t border-gray-400 flex-grow mr-3"></div>
              <span className="text-gray-400">hoặc</span>
              <div className="border-t border-gray-400 flex-grow ml-3"></div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full cursor-pointer mb-4 flex items-center justify-center gap-2 py-2 px-4 border border-gray-500 rounded-md shadow-sm text-sm font-medium text-gray-200"
            >
              <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
              Đăng ký với Google
            </button>

            <p className="text-center text-sm text-gray-300">
              Đã có tài khoản?{" "}
              <Link
                to="/signin"
                className="font-medium text-[#e0c068] hover:text-amber-500"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </form>
        </div>
        {/* Cột giới thiệu (bên trái) */}
        <div className="hidden md:flex w-full md:w-1/3 p-8 items-center justify-center">
          <div className="text-center max-w-sm">
            <h2 className="text-2xl font-bold text-white mb-4">
              Chào mừng bạn đến với ArtJourney
            </h2>

            {/* Adjusted image container */}
            <div className="mb-6 -mx-8">
              <img
                src={SideBG}
                alt="ArtJourney illustration"
                className="w-full h-[400px] object-cover"
              />
            </div>

            <button className="w-full px-6 py-3 bg-[#e0c068] text-primary-black font-medium rounded-lg transition-colors hover:bg-amber-500">
              Bắt đầu học miễn phí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
