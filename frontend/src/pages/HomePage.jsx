import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoCHatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";

function HomePage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-[100dvh] pt-16 overflow-hidden bg-[#F8FAFC]">
      <div className="flex items-center justify-center h-full px-0 sm:px-4 py-0 sm:py-6">
        <div className="bg-white shadow-sm border border-slate-200 w-full max-w-6xl h-full sm:h-[calc(100vh-8rem)] sm:rounded-2xl overflow-hidden">
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
