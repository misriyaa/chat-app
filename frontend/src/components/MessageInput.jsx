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
    <div className="p-3 sm:p-4 w-full border-t border-base-300 bg-base-100">
      {/* Image Preview Block */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl border border-base-300 shadow-xs"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-base-300 text-base-content hover:bg-base-content hover:text-base-100 flex items-center justify-center shadow-xs cursor-pointer transition-colors"
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
            className="input input-bordered rounded-xl input-sm sm:input-md flex-1 bg-base-100 text-base-content placeholder:text-base-content/50"
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
            className={`btn btn-circle btn-sm sm:btn-md btn-ghost ${
              imagePreview
                ? "text-success"
                : "text-base-content/60 hover:text-primary"
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
          className="btn btn-primary btn-circle btn-sm sm:btn-md"
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
