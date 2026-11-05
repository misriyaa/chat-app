import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function Sidebar() {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers = [] } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-slate-200 bg-white flex flex-col transition-all duration-200">
      <div className="border-b border-slate-200 w-full p-4 lg:p-5">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-[#7C3AED]" />
          <span className="font-semibold text-[#111827] hidden lg:block">Contacts</span>
        </div>
        {/* Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary accent-[#7C3AED]"
            />
            <span className="text-sm font-medium text-slate-700 select-none">Show online only</span>
          </label>
          <span className="text-xs font-medium text-slate-500">({Math.max(0, onlineUsers.length - 1)} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-2">
        {filteredUsers.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-3 flex items-center gap-3 transition-colors text-left cursor-pointer
                ${
                  isSelected
                    ? "bg-violet-50 text-[#111827] border-l-4 border-l-[#7C3AED]"
                    : "hover:bg-slate-50 text-slate-700"
                }
              `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.jpg"}
                  alt={user.fullName}
                  className="size-11 object-cover rounded-full border border-slate-200"
                />
                {/* Online status indicator dot */}
                {isOnline && (
                  <span className="absolute bottom-0 right-0 size-3 bg-emerald-500 rounded-full ring-2 ring-white" />
                )}
              </div>

              {/* User Info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="font-semibold text-sm text-[#111827] truncate">
                  {user.fullName}
                </div>
                <div className="text-xs mt-0.5">
                  <span className={isOnline ? "text-emerald-600 font-medium" : "text-slate-400"}>
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="text-center text-slate-400 py-8 text-sm hidden lg:block">
            No contacts found
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
