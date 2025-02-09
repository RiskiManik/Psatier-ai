"use client";

import { useChat, type UseChatOptions } from "ai/react";
import { Chat } from "@/components/ui/chat";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

type ChatDemoProps = {
  initialMessages?: UseChatOptions["initialMessages"];
};

export function ChatDemo(props: ChatDemoProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const model = searchParams.get("model");
  const id = searchParams.get("id");

  const suggestions = useMemo(
    () => [
      "Anies ngapain sih?",
      "Lebih besar mana 9.11 atau 9.9?",
      "Berikan saya joke sarkas tentang programmer?",
    ],
    []
  );

  const spString = useMemo(() => searchParams.toString(), [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(spString);
      params.set(name, value);
      return params.toString();
    },
    [spString]
  );

  const handleResponse = useCallback(
    (response: Response) => {
      if (response.ok && pathname === "/" && !id) {
        router.replace(
          `${pathname}?${createQueryString("id", Date.now().toString())}`
        );
      }
    },
    [pathname, id, router, createQueryString]
  );

  // Memoisasi callback onFinish
  const handleFinish = useCallback(() => {
    if (pathname === "/" && id) {
      router.push(`/chat/${id}`);
    }
  }, [pathname, id, router]);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    isLoading,
  } = useChat({
    ...props,
    api: `/api/chat?${createQueryString("model", model || "")}`,
    onResponse: handleResponse,
    onFinish: handleFinish,
  });

  return (
    <div className="flex max-h-[calc(100vh-6rem)] h-screen min-w-[calc(100vw-24rem)] justify-center mx-auto p-4">
      <Chat
        className="grow"
        messages={messages}
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
        isGenerating={isLoading}
        stop={stop}
        append={append}
        suggestions={suggestions}
      />
    </div>
  );
}
