"use client";
import {
  ChatMessage,
  type ChatMessageProps,
  type Message,
} from "@/components/ui/chat-message";
import { TypingIndicator } from "@/components/ui/typing-indicator";
import {
  ChatHistory,
  ChatMessage as ChatMessageDB,
  createChatHistory,
  updateChatHistory,
} from "@/lib/indexDB";
import { useParams, useSearchParams } from "next/navigation";

import { useCallback, useEffect } from "react";

type AdditionalMessageOptions = Omit<ChatMessageProps, keyof Message>;

interface MessageListProps {
  messages: Message[];
  showTimeStamps?: boolean;
  isTyping?: boolean;
  isGenerating?: boolean;
  messageOptions?:
    | AdditionalMessageOptions
    | ((message: Message) => AdditionalMessageOptions);
}

export function MessageList({
  messages,
  showTimeStamps = true,
  isTyping = false,
  messageOptions,
  isGenerating,
}: MessageListProps) {
  const searchParams = useSearchParams();

  const params = useParams<{ id: string }>();
  const id = searchParams.get("id") || params.id;

  const setHistory = useCallback(async () => {
    const newChat: ChatHistory = {
      id: id || Date.now().toString(),
      messages: messages as ChatMessageDB[],
    };

    try {
      if (id) {
        await updateChatHistory(newChat);
      } else {
        await createChatHistory(newChat);
      }
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
  }, [messages, id]);

  useEffect(() => {
    if (!isGenerating) {
      setHistory();
    }
  }, [setHistory, isGenerating]);

  return (
    <div className="space-y-4 overflow-visible min-w-[calc(100vw-24rem)]">
      {messages.map((message, index) => {
        const additionalOptions =
          typeof messageOptions === "function"
            ? messageOptions(message)
            : messageOptions;

        return (
          <ChatMessage
            key={index}
            showTimeStamp={showTimeStamps}
            {...message}
            {...additionalOptions}
          />
        );
      })}
      {isTyping && <TypingIndicator />}
    </div>
  );
}
