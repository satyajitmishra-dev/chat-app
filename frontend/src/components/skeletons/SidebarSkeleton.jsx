import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="h-full w-20 lg:w-80 border-r border-base-300 
    flex flex-col transition-all duration-300 bg-base-100"
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full p-4">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          <span className="font-semibold text-lg hidden lg:block">Contacts</span>
        </div>
        
        {/* Search skeleton */}
        <div className="mt-3 hidden lg:block">
          <div className="skeleton h-9 w-full rounded-lg bg-base-300" />
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-2">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3 animate-pulse">
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full bg-base-300" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2 bg-base-300 rounded-full" />
              <div className="skeleton h-3 w-16 bg-base-300 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
