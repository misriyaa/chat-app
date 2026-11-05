const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-100">
      {skeletonMessages.map((_, idx) => (
        <div 
          key={idx} 
          className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}
        >
          {/* Avatar Skeleton */}
          <div className="chat-image avatar">
            <div className="size-10 rounded-full border border-base-300 overflow-hidden">
              <div className="skeleton w-full h-full rounded-full" />
            </div>
          </div>

          {/* Header/Name Skeleton */}
          <div className="chat-header mb-1">
            <div className="skeleton h-3 w-14" />
          </div>

          {/* Message Bubble Skeleton */}
          <div className="chat-bubble bg-transparent p-0">
            <div className="skeleton h-14 w-[200px] rounded-2xl" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
