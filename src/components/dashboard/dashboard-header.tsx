"use client"

import { LanguageToggle } from "@/components/language-toggle"
import { Logo } from "@/components/logo"
import { UserNav } from "./user-nav"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6 z-50">
      <Logo />
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          <LanguageToggle />
        </div>
        <UserNav />
      </div>
    </header>
  )
}
