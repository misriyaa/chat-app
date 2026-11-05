import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare } from "lucide-react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-base-100">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-base-100">
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-base-content/60 gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <MessageSquare className="w-6 h-6" />
            </div>
            <p className="font-semibold text-base-content">No messages yet</p>
            <p className="text-xs text-base-content/60">Send a message to start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isSentByMe = message.senderId === authUser?._id;

            return (
              <div
                key={message._id}
                className={`chat ${isSentByMe ? "chat-end" : "chat-start"}`}
              >
                {/* Avatar */}
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full border border-base-300 overflow-hidden shadow-xs">
                    <img
                      src={
                        isSentByMe
                          ? authUser?.profilePic || "/avatar.jpg"
                          : selectedUser?.profilePic || "/avatar.jpg"
                      }
                      alt="profile"
                    />
                  </div>
                </div>

                {/* Time */}
                <div className="chat-header mb-1">
                  <time className="text-xs text-base-content/60 font-medium ml-1">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>

                {/* Message Bubble */}
                <div
                  className={`chat-bubble break-words ${
                    isSentByMe
                      ? "chat-bubble-primary"
                      : "bg-base-200 text-base-content"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="attachment"
                      className="max-w-[250px] rounded-xl mb-2 object-cover border border-base-300"
                    />
                  )}

                  {message.text && (
                    <p className="break-words text-sm leading-relaxed">{message.text}</p>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
