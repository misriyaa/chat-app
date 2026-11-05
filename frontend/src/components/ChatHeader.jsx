import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers = [] } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-3 sm:px-6 border-b border-slate-200 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative border border-slate-200 overflow-hidden">
              <img
                src={selectedUser.profilePic || "/avatar.jpg"}
                alt={selectedUser.fullName}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-semibold text-[#111827] text-sm sm:text-base leading-tight">
              {selectedUser.fullName}
            </h3>
            <p className="text-xs font-medium flex items-center gap-1.5 mt-0.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isOnline
                    ? "bg-emerald-500 ring-2 ring-emerald-500/20"
                    : "bg-slate-300"
                }`}
              />
              <span className={isOnline ? "text-emerald-600" : "text-slate-500"}>
                {isOnline ? "Online" : "Offline"}
              </span>
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-1.5 text-slate-500 hover:text-[#111827] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Close conversation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
