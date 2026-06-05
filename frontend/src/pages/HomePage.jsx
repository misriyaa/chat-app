import React from "react";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoCHatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";

function HomePage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-[100dvh] pt-16 overflow-hidden">
      <div className="flex items-center justify-center h-full px-0 sm:px-4">
        <div className="bg-base-100 shadow-cl w-full max-w-6xl h-full sm:h-[calc(100vh-8rem)] sm:rounded-lg">
          <div className="flex h-full rounded-lg overflow-hidden">
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