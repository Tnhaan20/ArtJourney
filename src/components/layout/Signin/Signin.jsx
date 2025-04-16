import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { assets } from "../../../assets/assets";
import GoogleIcon from "../../../assets/google.svg";
import SideBG from "../../../assets/SideBGSignIn.jpg";
import Input from "../../elements/input/Input";
import { TailwindStyle } from "../../../utils/Enum";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-white">
      <div className="flex w-full max-w-6xl rounded-lg shadow-lg overflow-hidden">
        {/* Form section (left) */}

        {/* Welcome section (right) */}
        <div className="hidden md:block w-1/2 p-8">
          <div className="h-full flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-amber-800 mb-4">
              Welcome to Art Journey
            </h2>

            <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
              <img
                src={SideBG}
                alt="Art Journey"
                className="w-full h-auto object-cover"
              />
            </div>

            <p className="text-center text-amber-800 mb-4">
              "Learn art history & Discover the stories behind masterpieces and
              enhance your understanding of art."
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 bg-white">
          <div className="flex items-center justify-center mb-6">
            <Link to="/">
              <img className="h-16" src={assets.artjourney_logo} alt="Logo" />
            </Link>
            <div className="border-l border-primary-yellow mx-5 h-10"></div>
            <span className="text-primary-yellow font-bold text-2xl">
              LOG IN
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              name="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-primary-yellow hover:text-secondary"
              >
                Forgot your password?
              </Link>

              <div className="text-right">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-yellow hover:text-secondary"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>

            <div className="relative flex items-center justify-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="text-sm">
              <p className="font-medium">Sign in with</p>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full mt-2 flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
                Sign in with Google
              </button>
            </div>

            <button
              type="submit"
              className={`cursor-pointer w-full flex justify-center rounded-lg py-2 px-4 ${TailwindStyle.HIGHLIGHT_FRAME}`}
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
