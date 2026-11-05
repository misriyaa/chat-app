import { MessageSquare, Sparkles, Shield, Zap } from "lucide-react";

function AuthImagePattern({ title, subtitle }) {
  return (
    <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-12 bg-[#111827] relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[#7C3AED]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-64 h-64 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Modern 3x3 pattern grid */}
        <div className="grid grid-cols-3 gap-3.5 mb-10 w-full max-w-xs">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl flex items-center justify-center transition-all duration-300 ${
                i % 2 === 0
                  ? "bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#C4B5FD] shadow-lg shadow-[#7C3AED]/10 animate-pulse"
                  : "bg-[#1F2937]/90 border border-slate-700/60 text-slate-400"
              }`}
            >
              {i === 4 ? (
                <MessageSquare className="w-6 h-6 text-[#A78BFA]" />
              ) : i === 0 || i === 8 ? (
                <Sparkles className="w-4 h-4 text-[#C4B5FD]" />
              ) : i === 2 ? (
                <Zap className="w-4 h-4 text-[#A78BFA]" />
              ) : i === 6 ? (
                <Shield className="w-4 h-4 text-[#A78BFA]" />
              ) : (
                <div className="w-2.5 h-2.5 rounded-full bg-slate-600/80" />
              )}
            </div>
          ))}
        </div>

        {/* Heading */}
        <h2 className="text-2xl lg:text-3xl font-bold text-white text-center mb-3 tracking-tight">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-slate-400 text-sm lg:text-base text-center max-w-sm leading-relaxed mb-8">
          {subtitle}
        </p>

        {/* Subtle Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-[#1F2937]/80 border border-slate-700/80 px-3 py-1.5 rounded-full">
            <Zap className="w-3.5 h-3.5 text-[#A78BFA]" />
            Real-time Chat
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-[#1F2937]/80 border border-slate-700/80 px-3 py-1.5 rounded-full">
            <Shield className="w-3.5 h-3.5 text-[#A78BFA]" />
            Secure & Private
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-[#1F2937]/80 border border-slate-700/80 px-3 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
            Always Connected
          </span>
        </div>
      </div>
    </div>
  );
}

export default AuthImagePattern;
