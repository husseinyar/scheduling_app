"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import { useUser } from "@/hooks/use-user"
import allUsers from "@/lib/data/users.json"
import { Calendar, Clock, User as UserIcon, Users } from "lucide-react"
import { type Shift } from "./admin-dashboard"

interface ShiftCardProps {
  shift: Shift
  onShiftUpdate: (updatedShift: Shift) => void
  onAssign: (shift: Shift) => void
  onCreate: () => void // Not used here, but for consistency
}

export function ShiftCard({ shift, onShiftUpdate, onAssign }: ShiftCardProps) {
  const { t, lang } = useTranslation()
  const { user } = useUser()

  const assignedUser = shift.assignedTo ? allUsers.find(u => u.id === shift.assignedTo) : null
  const hasApplied = user && shift.applicants.includes(user.id)

  const handleApply = () => {
    if (!user || hasApplied) return
    const updatedShift = {
      ...shift,
      applicants: [...shift.applicants, user.id],
      status: 'pending' as 'pending'
    }
    onShiftUpdate(updatedShift)
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "assigned":
        return "default"
      case "open":
        return "secondary"
      case "pending":
        return "outline"
      default:
        return "default"
    }
  }

  const statusText = t(`shiftCard.${shift.status}`)

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>{shift.title}</CardTitle>
                <CardDescription>
                    <Badge variant={getStatusVariant(shift.status)}>{statusText}</Badge>
                </CardDescription>
            </div>
            {user?.role === 'admin' && <Button variant="ghost" size="sm" onClick={() => onAssign(shift)}>{t('shiftCard.edit')}</Button>}
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{new Date(shift.date).toLocaleDateString(lang, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{shift.start} - {shift.end}</span>
        </div>
        {assignedUser && (
          <div className="flex items-center">
            <UserIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{t('shiftCard.assignedTo')}: {assignedUser.name}</span>
          </div>
        )}
         {shift.applicants.length > 0 && user?.role !== 'employee' && (
            <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{shift.applicants.length} {shift.applicants.length > 1 ? 'Ansökningar' : 'Ansökan'}</span>
            </div>
        )}
      </CardContent>
      <CardFooter>
        {user?.role === 'employee' && shift.status === 'open' && (
          <Button onClick={handleApply} disabled={hasApplied} className="w-full">
            {hasApplied ? t('shiftCard.applied') : t('shiftCard.apply')}
          </Button>
        )}
        {(user?.role === 'manager' || user?.role === 'admin') && shift.status !== 'assigned' && (
          <Button onClick={() => onAssign(shift)} className="w-full">
            {t('shiftCard.assign')}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
