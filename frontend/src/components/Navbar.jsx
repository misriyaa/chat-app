import { Link } from "react-router-dom";
import {
  MessageSquare,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function Navbar() {
  const { authUser, logout } = useAuthStore();

  return (
    <header className="fixed w-full top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center justify-between h-full">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2.5 group transition-transform active:scale-95"
            >
              <div className="w-9 h-9 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] group-hover:bg-[#7C3AED] group-hover:text-white transition-colors duration-200">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-[#111827] tracking-tight group-hover:text-[#7C3AED] transition-colors">
                Chatty
              </span>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2.5">
            <Link
              to="/settings"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[#334155] bg-[#F8FAFC] hover:bg-[#F1F5F9] hover:text-[#111827] border border-[#E2E8F0] transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4 text-[#64748B]" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[#334155] bg-[#F8FAFC] hover:bg-[#F1F5F9] hover:text-[#111827] border border-[#E2E8F0] transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-[#64748B]" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100/80 border border-rose-200 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
