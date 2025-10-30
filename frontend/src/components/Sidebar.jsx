import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter((user) => showOnlineOnly ? onlineUsers.includes(user._id) : true)
    .filter((user) => 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-base-300 flex flex-col transition-all duration-300 bg-base-100">
      {/* Header Section */}
      <div className="border-b border-base-300 w-full p-3 lg:p-4 flex flex-col gap-3">
        <div className="flex items-center justify-center lg:justify-start gap-2">
          <Users className="size-6 text-primary" />
          <span className="font-semibold text-lg hidden lg:block">Contacts</span>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content/40" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-sm input-bordered w-full pl-9"
          />
        </div>

        {/* Online Filter Toggle */}
        <div className="flex items-center justify-center lg:justify-start gap-2 text-xs lg:text-sm">
          <label className="cursor-pointer flex items-center gap-2 hover:opacity-80 transition-opacity">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="hidden lg:inline font-medium">Show online only</span>
          </label>
          <span className="text-base-content/60 font-semibold">
            ({onlineUsers?.length - 1 || 0})
          </span>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto flex-1 py-2">
        {filteredUsers?.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full flex items-center gap-3 p-3 lg:p-3 
              hover:bg-base-200 transition-all duration-200
              border-l-4 border-transparent
              ${selectedUser?._id === user._id 
                ? "bg-base-200 border-l-primary shadow-sm" 
                : "hover:border-l-base-300"
              }
            `}
          >
            <div className="relative flex justify-center w-full lg:w-auto">
              <div className="avatar">
                <div className="size-12 rounded-full ring-2 ring-base-300">
                  <img
                    src={user.avatar || "/avatar.jpg"}
                    alt={user.name}
                    className="object-cover"
                  />
                </div>
              </div>
              {onlineUsers?.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3.5 bg-green-500 rounded-full ring-2 ring-base-100 pulse-ring" />
              )}
            </div>

            {/* User Info - Hidden on mobile */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-semibold truncate text-sm">
                {user.fullName}
              </div>
              <div className="text-xs text-base-content/60 flex items-center gap-1">
                <span className={`size-2 rounded-full ${onlineUsers?.includes(user._id) ? 'bg-green-500' : 'bg-base-content/30'}`} />
                {onlineUsers?.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/50 py-8 px-4">
            <Users className="size-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-medium">No users found</p>
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
