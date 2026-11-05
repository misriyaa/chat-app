import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoCHatSelected";
import ChatContainer from "../components/ChatContainer";

function HomePage() {
  const { selectedUser } = useChatStore();
  const { theme } = useThemeStore();

  return (
    <div className="h-[100dvh] pt-16 overflow-hidden bg-[#F8FAFC]">
      <div className="flex items-center justify-center h-full px-0 sm:px-4 py-0 sm:py-6">
        <div
          data-theme={theme}
          className="bg-base-100 text-base-content shadow-lg border border-base-300 w-full max-w-6xl h-full sm:h-[calc(100vh-8rem)] sm:rounded-2xl overflow-hidden"
        >
          <div className="flex h-full rounded-2xl overflow-hidden">
            {/* Sidebar: hidden on mobile if a user is selected */}
            <div className={`h-full flex flex-col ${selectedUser ? "hidden md:flex" : "flex w-full md:w-auto"}`}>
              <Sidebar />
            </div>

            {/* Chat area: hidden on mobile if no user is selected */}
            <div className={`h-full flex flex-col flex-1 ${!selectedUser ? "hidden md:flex" : "flex"}`}>
              {!selectedUser ? (
                <NoChatSelected />
              ) : (
                <ChatContainer />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
