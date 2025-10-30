import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, Palette } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const Settings = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen pt-20 pb-8 bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="flex flex-col gap-2 bg-base-100 p-6 rounded-2xl shadow-lg border border-base-300">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl">
                <Palette className="size-6 text-primary-content" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Theme Settings
                </h2>
                <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
              </div>
            </div>
          </div>

          {/* Theme Grid */}
          <div className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-300">
            <h3 className="text-lg font-semibold mb-4">Available Themes</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`
                    group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300
                    ${theme === t 
                      ? "bg-primary/10 ring-2 ring-primary shadow-lg scale-105" 
                      : "bg-base-200 hover:bg-base-300 hover:scale-105"
                    }
                  `}
                  onClick={() => setTheme(t)}
                >
                  <div className="relative h-10 w-full rounded-lg overflow-hidden shadow-md" data-theme={t}>
                    <div className="absolute inset-0 grid grid-cols-4 gap-1 p-1">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-accent"></div>
                      <div className="rounded bg-neutral"></div>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold truncate w-full text-center ${
                    theme === t ? "text-primary" : ""
                  }`}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-300">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
              Live Preview
            </h3>
            <div className="rounded-2xl border-2 border-base-300 overflow-hidden bg-base-200 shadow-2xl">
              <div className="p-4 sm:p-6">
                <div className="max-w-2xl mx-auto">
                  {/* Mock Chat UI */}
                  <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-base-300">
                    {/* Chat Header */}
                    <div className="px-4 py-3 border-b border-base-300 bg-gradient-to-r from-base-100 to-base-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content font-bold shadow-lg">
                          S
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">Satyajit</h3>
                          <p className="text-xs text-base-content/70 flex items-center gap-1">
                            <span className="size-2 bg-green-500 rounded-full animate-pulse" />
                            Online
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="p-4 space-y-4 min-h-[200px] max-h-[300px] overflow-y-auto bg-base-200/30">
                      {PREVIEW_MESSAGES.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isSent ? "justify-end" : "justify-start"} animate-fadeIn`}
                        >
                          <div
                            className={`
                              max-w-[85%] rounded-2xl p-3 shadow-lg transition-all hover:scale-105
                              ${message.isSent 
                                ? "bg-primary text-primary-content rounded-br-sm" 
                                : "bg-base-100 rounded-bl-sm"
                              }
                            `}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={`
                                text-[10px] mt-1.5 font-medium
                                ${message.isSent ? "text-primary-content/70" : "text-base-content/60"}
                              `}
                            >
                              12:00 PM
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-base-300 bg-base-100">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="input input-bordered flex-1 text-sm h-10 rounded-xl focus:ring-2 focus:ring-primary/50"
                          placeholder="Type a message..."
                          value="This is a preview"
                          readOnly
                        />
                        <button className="btn btn-primary h-10 min-h-0 px-4 rounded-xl shadow-lg hover:scale-105 transition-all">
                          <Send size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
