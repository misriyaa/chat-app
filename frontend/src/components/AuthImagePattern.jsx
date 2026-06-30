function AuthImagePattern({ title, subtitle }) {
  return (
    <div className="hidden lg:flex flex-1 flex-col items-center justify-center px-16 bg-[#0f172a]">

      {/* Glowing dot */}
      <div className="relative flex items-center justify-center mb-10">
        <div className="w-3 h-3 rounded-full "/>
        <div className="absolute w-8 h-8 rounded-full bg-violet-500/20" />
        <div className="absolute w-14 h-14 rounded-full bg-violet-500/10" />
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-4">
        {title}
      </h2>

      {/* Subtitle */}
      <p className=" text-center text-sm leading-relaxed max-w-xs mb-12">
        {subtitle}
      </p>

      {/* Horizontal lines decoration */}
      <div className="flex flex-col gap-2 w-full max-w-xs">
        <div className="h-px bg-gray-800 w-full" />
        <div className="h-px bg-gray-800 w-3/4 mx-auto" />
        <div className="h-px bg-gray-800 w-1/2 mx-auto" />
      </div>

    </div>
  );
}

export default AuthImagePattern;