import { useState, useRef } from 'react';
import { X, Image, Send } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      console.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      removeImage();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-3 sm:p-4 w-full border-t border-slate-200 bg-white">
      {/* Image Preview Block */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl border border-slate-200 shadow-xs"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-900 text-white flex items-center justify-center shadow-xs cursor-pointer transition-colors"
              type="button"
              aria-label="Remove image"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Input Form Controls */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-[#111827] placeholder:text-slate-400 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all duration-200"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Hidden File Input & Image Button */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`p-2.5 rounded-xl border transition-colors flex items-center justify-center cursor-pointer ${
              imagePreview
                ? "text-emerald-600 bg-emerald-50 border-emerald-300 hover:bg-emerald-100"
                : "text-slate-500 bg-white border-slate-200 hover:text-[#7C3AED] hover:bg-slate-50"
            }`}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Attach an image"
          >
            <Image size={20} />
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="p-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          disabled={!text.trim() && !imagePreview}
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
