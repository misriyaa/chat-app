import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-slate-200 bg-white flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-slate-200 w-full p-4 lg:p-5">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#7C3AED]" />
          <span className="font-semibold text-[#111827] hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-11 rounded-full bg-slate-200" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2 bg-slate-200" />
              <div className="skeleton h-3 w-16 bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
