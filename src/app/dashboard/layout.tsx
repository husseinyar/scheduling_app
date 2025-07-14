"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/use-user"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    // If the check has run and there's no user, redirect to login
    if (user === null && localStorage.getItem('userId') === null) {
      router.push("/")
    }
  }, [user, router])
  
  // While authenticating, show a loader or skeleton
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  )
}
