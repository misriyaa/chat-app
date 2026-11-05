import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-8 sm:p-16 bg-base-100">
      <div className="max-w-md text-center space-y-4">
        {/* Icon Display */}
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center ring-8 ring-primary/5 animate-bounce">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-base-content tracking-tight">
          Welcome to Chatty!
        </h2>
        <p className="text-base-content/60 text-sm leading-relaxed max-w-sm mx-auto">
          Select a conversation from the contacts list to start messaging in real-time.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
