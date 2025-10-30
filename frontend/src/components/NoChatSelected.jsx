import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-8 lg:p-16 bg-gradient-to-br from-base-200 to-base-100">
      <div className="max-w-md text-center space-y-6 animate-fadeIn">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-20 h-20 lg:w-24 lg:h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center
             justify-center animate-float shadow-2xl backdrop-blur-sm"
            >
              <MessageSquare className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
            </div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary to-secondary opacity-20 blur-xl animate-pulse" />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-3">
          <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to BlinkChat!
          </h2>
          <p className="text-base-content/60 text-sm lg:text-base">
            Select a conversation from the sidebar to start chatting and connect with your friends
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-2 pt-4">
          <div className="w-2 h-2 rounded-full bg-primary/50 animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 rounded-full bg-secondary/50 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 rounded-full bg-accent/50 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
