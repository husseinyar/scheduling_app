"use client"

import { useUser } from "@/hooks/use-user"
import allUsers from "@/lib/data/users.json"
import allMessages from "@/lib/data/messages.json"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import { ScrollArea } from "@/components/ui/scroll-area"

export function Chat() {
  const { user } = useUser()
  const { t } = useTranslation()

  if (!user) return null

  const userMessages = allMessages.filter(
    (msg) => msg.fromId === user.id || msg.toId === user.id
  )

  const getPartner = (msg: (typeof allMessages)[0]) => {
    const partnerId = msg.fromId === user.id ? msg.toId : msg.fromId
    return allUsers.find((u) => u.id === partnerId)
  }

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('chat.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72">
          <div className="space-y-4">
            {userMessages.length > 0 ? (
              userMessages
                .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                .map((msg) => {
                  const partner = getPartner(msg)
                  const isSent = msg.fromId === user.id
                  return (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2 ${
                        isSent ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isSent && partner && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={partner.avatarUrl} data-ai-hint="user avatar" />
                          <AvatarFallback>{getInitials(partner.name)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-xs rounded-lg p-3 ${
                          isSent
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                      {isSent && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatarUrl} data-ai-hint="user avatar" />
                          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  )
                })
            ) : (
              <p className="text-center text-sm text-muted-foreground">{t('chat.noMessages')}</p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
