import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers = [] } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-3 sm:px-6 border-b border-base-300 bg-base-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative border border-base-300 overflow-hidden">
              <img
                src={selectedUser.profilePic || "/avatar.jpg"}
                alt={selectedUser.fullName}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-semibold text-base-content text-sm sm:text-base leading-tight">
              {selectedUser.fullName}
            </h3>
            <p className="text-xs font-medium flex items-center gap-1.5 mt-0.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isOnline
                    ? "bg-green-500 ring-2 ring-green-500/20"
                    : "bg-base-content/30"
                }`}
              />
              <span className={isOnline ? "text-green-500" : "text-base-content/60"}>
                {isOnline ? "Online" : "Offline"}
              </span>
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-sm btn-ghost btn-circle text-base-content/70 hover:text-base-content"
          aria-label="Close conversation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
