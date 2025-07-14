"use client"

import type { ReactNode } from "react"
import { LanguageProvider } from "@/contexts/language-context"
import { UserProvider } from "@/contexts/user-context"
import { Toaster } from "@/components/ui/toaster"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <UserProvider>
        {children}
        <Toaster />
      </UserProvider>
    </LanguageProvider>
  )
}
