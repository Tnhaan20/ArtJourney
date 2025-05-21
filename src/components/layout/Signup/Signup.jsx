import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { assets } from "@/assets/assets";
import GoogleIcon from "@/assets/google.svg";
import SideBG from "@/assets/SideBGSignIn.jpg";
import Input from "@/components/elements/input/Input";
import Checkbox from "@/components/elements/checkbox/Checkbox";
import { TailwindStyle } from "@/utils/Enum";
import { useAuthForm } from "@/hooks/Auth/use-auth-form";
import { AuthServices } from "@/domains/services/Auth/auth.services";
import { useAuth } from '@/hooks/Auth/use-auth';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const { form, onSubmit, isLoading } = useAuthForm({ type: "register" });
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const { googleLogin } = useAuth();
  const googleLoginQuery = googleLogin();

  const handleGoogleSignIn = () => {
    googleLoginQuery.refetch();
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex w-full max-w-6xl rounded-lg shadow-lg overflow-hidden">
        {/* Form section (left) */}
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
              SIGN UP
            </span>
          </div>

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
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500"
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

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    label="Confirm Password"
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

            <div className="text-right">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-medium text-primary-yellow hover:text-secondary"
                >
                  Login
                </Link>
              </p>
            </div>

            <div className="relative flex items-center justify-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="text-sm">
              <p className="font-medium">Sign up with</p>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoginQuery.isFetching}
                className="w-full mt-2 flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <img
                  loading="lazy"
                  src={GoogleIcon}
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign up with Google
              </button>
            </div>

            <div className="flex items-start">
              <Checkbox
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
                color="primary-yellow"
              >
                You accept our Terms of Use, Privacy Policy, and agree that your
                data will be shared.
              </Checkbox>
            </div>

            <button
              type="submit"
              disabled={isLoading || !agreeToTerms}
              className={`cursor-pointer w-full flex justify-center rounded-lg py-2 px-4 ${
                TailwindStyle.HIGHLIGHT_FRAME
              } ${isLoading || !agreeToTerms ? "opacity-70" : ""}`}
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>

        {/* Welcome section (right) */}
        <div className="hidden md:block w-1/2 p-8">
          <div className="h-full flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-primary-yellow mb-4">
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

            <p className="text-center text-primary-yellow mb-4">
              "Learn art history & Discover the stories behind masterpieces and
              enhance your understanding of art."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
