"use client"

import { useEffect, useState, type ReactNode } from "react"
import { LanguageProvider } from "@/contexts/language-context"
import { UserProvider } from "@/contexts/user-context"
import { Toaster } from "@/components/ui/toaster"

export function AppProviders({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }
  
  return (
    <LanguageProvider>
      <UserProvider>
        {children}
        <Toaster />
      </UserProvider>
    </LanguageProvider>
  )
}
