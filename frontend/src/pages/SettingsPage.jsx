import React, { useEffect } from "react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const PREVIEW_MESSAGES = [
  {
    id: 1,
    content: "Hey! How's it going?",
    isSent: false,
  },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

function SettingsPage() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-8">
        {/* Theme Selector */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Theme</h2>
          <p className="text-base-content/70 mb-6">
            Choose a theme for your chat interface
          </p>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {THEMES.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`
                  group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                  ${
                    theme === t
                      ? "bg-base-200"
                      : "hover:bg-base-200/50"
                  }
                `}
              >
                <div
                  data-theme={t}
                  className="relative h-8 w-full rounded-md overflow-hidden"
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="bg-primary rounded"></div>
                    <div className="bg-secondary rounded"></div>
                    <div className="bg-accent rounded"></div>
                    <div className="bg-neutral rounded"></div>
                  </div>
                </div>

                <span className="text-[11px] font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Preview
          </h3>

          <div
            data-theme={theme}
            className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg"
          >
            {/* Chat Header */}
            <div className="px-4 py-3 border-b border-base-300 bg-base-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary"></div>

                <div>
                  <h4 className="font-medium">John Doe</h4>
                  <p className="text-xs text-base-content/60">
                    Online
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-4 bg-base-100">
              {PREVIEW_MESSAGES.map((message) => (
                <div
                  key={message.id}
                  className={`chat ${
                    message.isSent
                      ? "chat-end"
                      : "chat-start"
                  }`}
                >
                  <div
                    className={`chat-bubble ${
                      message.isSent
                        ? "chat-bubble-primary"
                        : ""
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Preview */}
            <div className="p-4 border-t border-base-300 bg-base-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="input input-bordered flex-1"
                  disabled
                />

                <button className="btn btn-primary">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;