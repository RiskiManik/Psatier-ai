"use client";

import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MessageSquare, MessageSquarePlus, Trash } from "lucide-react";
import { ChatHistory, getChatHistory, deleteChatHistory } from "@/lib/indexDB";
import Link from "next/link";
import { ModelSwitcher } from "./model-switcher";
import { MODELS } from "@/constant/models";

export function AppSidebar() {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const history = await getChatHistory();
        setChatHistory(history);
      } catch (error) {
        console.error("Error loading chat history:", error);
      }
    };

    loadChatHistory();
  }, []);

  const handleDelete = async (chatId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await deleteChatHistory(chatId);
      setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
    } catch (error) {
      console.error("Error deleting chat history:", error);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <ModelSwitcher models={MODELS} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={`/`}>
                  <MessageSquarePlus className="size-4" />
                  <span>New Chat</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {chatHistory.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                {/* Gunakan container dengan class "group" agar kita bisa memanfaatkan group-hover */}
                <div className="flex items-center justify-between group">
                  <SidebarMenuButton asChild>
                    <Link
                      href={`/chat/${chat.id}`}
                      className="flex items-center gap-2"
                    >
                      <MessageSquare className="size-4" />
                      <span>
                        {chat.messages[0]?.content.substring(0, 30) ||
                          "New Chat"}
                        ...
                      </span>
                    </Link>
                  </SidebarMenuButton>

                  <button
                    onClick={(e) => handleDelete(chat.id, e)}
                    className="hidden group-hover:block absolute right-0 bottom-[25%] text-red-500/70"
                  >
                    <Trash className="size-4" />
                  </button>
                </div>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
