"use client"

import { LanguageProvider } from "@/contexts/language-context"
import { UserProvider } from "@/contexts/user-context"
import { Toaster } from "@/components/ui/toaster"

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <UserProvider>
        {children}
        <Toaster />
      </UserProvider>
    </LanguageProvider>
  )
}
