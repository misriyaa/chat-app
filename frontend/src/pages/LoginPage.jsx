import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }

    if (!formData.password) {
      return toast.error("Password is required");
    }

    return true;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      login(formData);
    }
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col lg:flex-row bg-white">
      {/* Left Section - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md py-4">
          {/* Logo & Heading */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center mb-4 ring-8 ring-[#7C3AED]/5">
              <MessageSquare className="w-6 h-6 text-[#7C3AED]" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
              Welcome Back
            </h1>

            <p className="text-sm text-[#64748B] mt-2">
              Sign in to your account to continue chatting
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1.5">
                Email Address
              </label>

              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] group-focus-within:text-[#7C3AED] transition-colors pointer-events-none" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl py-3 pl-11 pr-4 text-[#111827] placeholder:text-[#94A3B8] text-sm focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1.5">
                Password
              </label>

              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] group-focus-within:text-[#7C3AED] transition-colors pointer-events-none" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl py-3 pl-11 pr-11 text-[#111827] placeholder:text-[#94A3B8] text-sm focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all duration-200"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#111827] p-1 rounded-lg hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] active:bg-[#5B21B6] text-white py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm text-[#64748B] mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#7C3AED] font-semibold hover:text-[#6D28D9] hover:underline transition-colors"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue chatting with friends and stay connected."
      />
    </div>
  );
}

export default LoginPage;
