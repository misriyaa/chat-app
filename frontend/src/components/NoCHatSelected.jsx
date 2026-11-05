import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-8 sm:p-16 bg-[#F8FAFC]">
      <div className="max-w-md text-center space-y-4">
        {/* Icon Display */}
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center ring-8 ring-[#7C3AED]/5">
            <MessageSquare className="w-8 h-8 text-[#7C3AED]" />
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-[#111827] tracking-tight">
          Welcome to Chatty!
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
          Select a conversation from the contacts list to start messaging in real-time.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
