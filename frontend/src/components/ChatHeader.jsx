import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null; // safety for when no chat is selected

  const isOnline = onlineUsers?.includes(selectedUser._id); // safe check

  return (
    <div className="p-3 lg:p-4 border-b border-base-300 bg-base-100 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-12 rounded-full relative ring-2 ring-base-300 ring-offset-2 ring-offset-base-100">
              <img
                src={selectedUser?.avatar || "avatar.jpg"}
                alt={selectedUser.fullName}
                className="object-cover"
              />
              {isOnline && (
                <span className="absolute bottom-0 right-0 size-3.5 bg-green-500 rounded-full ring-2 ring-base-100 pulse-ring" />
              )}
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-semibold text-base lg:text-lg">
              {selectedUser.fullName}
            </h3>
            <p className="text-xs lg:text-sm flex items-center gap-1.5 text-base-content/70">
              <span className={`size-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-base-content/30'}`} />
              {isOnline ? "Active now" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="btn btn-sm btn-ghost btn-circle hover:bg-error/10 hover:text-error transition-all"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
