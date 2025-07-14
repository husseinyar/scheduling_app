"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useUser } from "@/hooks/use-user"
import { useTranslation } from "@/hooks/use-translation"
import users from "@/lib/data/users.json"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LanguageToggle } from "@/components/language-toggle"
import { Logo } from "@/components/logo"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useUser()
  const { t } = useTranslation()
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const handleLogin = () => {
    if (selectedUserId) {
      login(selectedUserId)
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="absolute top-0 right-0 p-4">
        <LanguageToggle />
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="items-center text-center">
            <Logo />
            <CardTitle className="text-2xl font-bold">{t('login.title')}</CardTitle>
            <CardDescription>{t('login.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select onValueChange={setSelectedUserId} value={selectedUserId || ""}>
                <SelectTrigger>
                  <SelectValue placeholder={t('login.selectUserPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} ({t(`roles.${user.role}`)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleLogin} disabled={!selectedUserId} className="w-full">
                {t('login.button')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
