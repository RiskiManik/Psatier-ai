import { ChatDemo as ChatAi } from "@/components/chat-ai";

export default function Home() {
  return (
    <main className="flex  flex-col min-w-[calc(100vw-24rem)] items-center mx-auto p-4">
      <ChatAi />
    </main>
  );
}
