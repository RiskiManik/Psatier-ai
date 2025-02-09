"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

import { ThemeProvider } from "./theme-provider";
import { ModeToggle } from "./toggle-mode";
import { Suspense } from "react";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <AppSidebar />
          <div className="flex flex-col w-full h-screen overflow-hidden">
            <div className="flex justify-between items-center p-4 ">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">PSatier AI</h1>
              <ModeToggle />
            </div>

            {children}
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </Suspense>
  );
}
