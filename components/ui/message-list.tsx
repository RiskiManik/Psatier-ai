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
import { useParams, useRouter } from "next/navigation";

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
  const router = useRouter();

  const params = useParams<{ id: string }>();
  const id = params.id ?? Date.now().toString();

  const setHistory = useCallback(async () => {
    const newChat: ChatHistory = {
      id: id,
      messages: messages as ChatMessageDB[],
    };

    try {
      if (params.id) {
        await updateChatHistory(newChat);
      } else {
        await createChatHistory(newChat);
        router.push(`/chat/${id}`);
      }
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
  }, [messages, params.id, router, id]);

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
