import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Optional preview
  setSelectedImg(URL.createObjectURL(file));

  // Send file directly
  await updateProfile(file);
};


  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="max-w-3xl mx-auto p-4 py-8 sm:p-8">
        <div className="bg-base-100 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl border border-base-300 animate-fadeIn">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Profile
            </h1>
            <p className="mt-2 text-base-content/60">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <img
                src={selectedImg || authUser?.data?.avatar || "avatar.jpg"}
                alt="Profile"
                className="size-32 sm:size-40 rounded-full object-cover border-4 border-base-300 shadow-xl relative z-10"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 z-20
                  bg-gradient-to-br from-primary to-secondary hover:scale-110
                  p-3 rounded-full cursor-pointer 
                  transition-all duration-300 shadow-lg
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-primary-content" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/60 font-medium">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-base-content/70 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name
              </div>
              <p className="px-4 py-3 bg-base-200 rounded-xl border border-base-300 font-medium shadow-sm">
                {authUser?.data?.fullName}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold text-base-content/70 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address
              </div>
              <p className="px-4 py-3 bg-base-200 rounded-xl border border-base-300 font-medium shadow-sm">
                {authUser?.data?.email}
              </p>
            </div>
          </div>

          {/* Account Information Card */}
          <div className="mt-6 bg-gradient-to-br from-base-200 to-base-100 rounded-2xl p-6 border border-base-300 shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
              Account Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-3 border-b border-base-300/50">
                <span className="text-base-content/70 font-medium">Member Since</span>
                <span className="font-semibold">{authUser?.data?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-base-300/50">
                <span className="text-base-content/70 font-medium">Last Update</span>
                <span className="font-semibold">{authUser?.data?.updatedAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-base-content/70 font-medium">Account Status</span>
                <span className="px-3 py-1 bg-success/20 text-success rounded-full text-xs font-bold flex items-center gap-1">
                  <span className="size-2 bg-success rounded-full animate-pulse" />
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;