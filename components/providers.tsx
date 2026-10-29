"use client";

import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { ConsentScripts } from "@/components/consent/ConsentScripts";
import { CookieConsentBanner } from "@/components/consent/CookieConsentBanner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <ConsentProvider>
          <TooltipProvider>
            {children}
            <Toaster />
            <Sonner position="top-right" />
          </TooltipProvider>
          <CookieConsentBanner />
          <ConsentScripts />
        </ConsentProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
