import { useState, useEffect, useRef } from "react";
import { InputComponent } from "../components/inputComponent";
import { MessageComponent } from "../components/messageComponent";
import { NavbarComponent } from "../components/navbarComponent";
import { generateImage } from "../services/generateImage";

type Message = {
  id: number;
  message: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string;
  isLoading?: boolean;
  prompt?: string;
};

function WorkingPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

const handleSubmit = async (prompt: string) => {
  const userMessage: Message = {
    id: Date.now(),
    message: prompt,
    isUser: true,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setIsLoading(true);

  const aiMessageId = Date.now() + 1;
  const aiMessage: Message = {
    id: aiMessageId,
    message: "Generating your image...",
    isUser: false,
    isLoading: true,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, aiMessage]);

  try {
    const data = await generateImage(prompt);
    console.log(data);
    
    if (data?.imageUrl || data?.url) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? {
                ...msg,
                message: "Here's your generated image:",
                imageUrl: data.imageUrl || data.url,
                isLoading: false,
                prompt: data.prompt,
              }
            : msg
        )
      );
    } else {
      // No image URL in response = failure
      throw new Error("No image URL found in response");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === aiMessageId
          ? {
              ...msg,
              message: "Sorry, I couldn't generate the image. Please try again.",
              isLoading: false,
            }
          : msg
      )
    );
  } finally {
    setIsLoading(false);
  }
};


  return (
    <>
      <NavbarComponent />
      <div className="min-h-screen bg-black">
        <div className="pt-16 pb-24 px-4">
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-red-800 mb-2">
                  AI Image Generator
                </h2>
                <p className="text-red-600 max-w-md mx-auto">
                  Describe any image you can imagine and I'll create it for you.
                  Just type your prompt below and press Enter or click Generate.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <MessageComponent
                    key={message.id}
                    message={message.message}
                    isUser={message.isUser}
                    imageUrl={message.imageUrl || ""}
                    isLoading={message.isLoading || false}
                    prompt={message.prompt || ""}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        <InputComponent onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </>
  );
}

export default WorkingPage;
