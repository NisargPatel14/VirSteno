"use client";
import React, { useState } from "react";

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatInputProps {
  sendMessage: (message: string) => void;
}

const ChatInput = ({ sendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center px-4 py-2 rounded-lg">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleSubmit}
        placeholder="Type your message..."
        className="flex-grow bg-gray-200 text-black py-2 px-4 rounded-lg focus:outline-none"
      />
      <button
        type="button"
        onClick={() => {
          sendMessage(message);
          setMessage("");
        }}
        className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded ml-2"
      >
        Send
      </button>
    </div>
  );
};

const ChatMessage = ({ text, isUser }: Message) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-lg rounded-lg px-4 py-2 ${
          isUser ? "bg-primary-600 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

const LoadingDots = () => {
  return (
    <div className="flex justify-center mb-2">
      <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse mr-1"></div>
      <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse mr-1 animation-delay-200"></div>
      <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></div>
    </div>
  );
};

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! Ask me about anything, and I'll do my best to assist you.",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (message: string) => {
    setIsLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser: true },
    ]);

    try {
      const response = await fetch("http://127.0.0.1:8787/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ai-api-key": "pk-AZJNfuIbSvrVAOEbozHEohLWoTxefipDLlEAjRTlPBzdqPyj",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant. Answer in 1 sentence. Reply only for what you are asked for. No images must be sent in response.",
            },
            ...messages.map((msg) => ({
              role: msg.isUser ? "user" : "assistant",
              content: msg.text,
            })),
            { role: "user", content: message },
          ],
        }),
      });

      const data = await response.json();
      const botResponse =
        data.choices[0].message.content.split("<|end_of_text|>")[0];
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, isUser: false },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card-1 m-4 p-8 border-2 bg-white shadow-lg rounded-2xl xs:text-[15px] xxs:text-[15px] xs:w-full xxs:w-full sm:w-full md:w-full lg:w-3/6 ">
        <div className="flex flex-col h-full">
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <ChatMessage key={index} text={msg.text} isUser={msg.isUser} />
            ))}
            {isLoading && <LoadingDots />}
            {error && <ChatMessage text={error} isUser={false} />}
          </div>
          <ChatInput sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Home;
