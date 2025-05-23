import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { assets } from "@/assets/assets";
import GoogleIcon from "@/assets/google.svg";
import SideBG from "@/assets/SideBGSignIn.jpg";
import Input from "@/components/elements/input/Input";
import { TailwindStyle } from "@/utils/Enum";
import { useAuthForm } from "@/hooks/Auth/use-auth-form";
import { AuthServices } from "@/domains/services/Auth/auth.services";
import { Controller } from "react-hook-form";
import { useAuth } from "@/hooks/Auth/use-auth";
import LazyImage from "@/components/elements/LazyImg/LazyImg";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  // Use the auth form hook for login
  const { form, onSubmit, isLoading } = useAuthForm({ type: "login" });
  const { googleLogin } = useAuth();
  const { initiateGoogleLogin } = googleLogin();
  
  const handleGoogleSignIn = () => {
    initiateGoogleLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-white">
      <div className="flex w-full max-w-6xl rounded-lg shadow-lg overflow-hidden">
        {/* Welcome section (right) */}
        <div className="hidden md:block w-1/2 p-8">
          <div className="h-full flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-amber-800 mb-4">
              Welcome to Art Journey
            </h2>

            <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
              <img
                loading="lazy"
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
              <img
                loading="lazy"
                className="h-16"
                src={assets.main_logo.artjourney_logo}
                alt="Logo"
              />
            </Link>
            <div className="border-l border-primary-yellow mx-5 h-10"></div>
            <span className="text-primary-yellow font-bold text-2xl">
              LOG IN
            </span>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <div>
                  <Input
                    type="email"
                    name="email"
                    label="Email Address"
                    value={field.value}
                    onChange={field.onChange}
                    required
                  />
                  {fieldState.error && (
                    <p className="mt-1 text-sm text-red-600">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="relative">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      label="Password"
                      value={field.value}
                      onChange={field.onChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    {fieldState.error && (
                      <p className="mt-1 text-sm text-red-600">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-primary-yellow hover:text-secondary-yellow"
              >
                Forgot your password?
              </Link>

              <div className="text-right">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-yellow hover:text-secondary-yellow"
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
                className="w-full mt-2 cursor-pointer flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <img
                  loading="lazy"
                  src={GoogleIcon}
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign in with Google
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center rounded-lg py-2 px-4 ${
                isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              } ${TailwindStyle.HIGHLIGHT_FRAME}`}
            >
              {isLoading ? "Logging in" : "Log in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


