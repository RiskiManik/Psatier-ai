"use client";

import { useState, useEffect, use } from "react";

import { getChatHistoryById, type ChatMessage } from "@/lib/indexDB";
import { ChatDemo } from "@/components/chat-ai";

export default function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [initialMessages, setInitialMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function loadChat() {
      try {
        const chatData = await getChatHistoryById(id as string);
        if (chatData) {
          setInitialMessages(chatData.messages);
        } else {
          console.error("Chat tidak ditemukan");
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
      } finally {
        setLoading(false);
      }
    }
    loadChat();
  }, [id]);

  return (
    <main className="flex  flex-col min-w-[calc(100vw-24rem)] items-center mx-auto p-4">
      {loading ? (
        <div>Loading chat...</div>
      ) : (
        <ChatDemo initialMessages={initialMessages} />
      )}
    </main>
  );
}
