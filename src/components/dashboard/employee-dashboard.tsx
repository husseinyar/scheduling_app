"use client"

import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { useUser } from "@/hooks/use-user"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import initialShifts from "@/lib/data/shifts.json"
import { ShiftCard } from "./shift-card"
import { Chat } from "./chat"

export type Shift = typeof initialShifts[0]

export default function EmployeeDashboard() {
  const { t } = useTranslation()
  const { user } = useUser()
  const [shifts, setShifts] = useState<Shift[]>(initialShifts)

  if (!user) return null

  const myShifts = shifts.filter(s => s.assignedTo === user.id)
  const openShifts = shifts.filter(s => s.status === 'open' || s.status === 'pending')

  const handleShiftUpdate = (updatedShift: Shift) => {
    setShifts(shifts.map(s => s.id === updatedShift.id ? updatedShift : s))
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-4">{t('dashboard.shifts')}</h2>
        <Tabs defaultValue="my-shifts">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="my-shifts">{t('dashboard.myShifts')}</TabsTrigger>
            <TabsTrigger value="open-shifts">{t('dashboard.openShifts')}</TabsTrigger>
          </TabsList>
          <TabsContent value="my-shifts">
            <div className="grid gap-4 md:grid-cols-2 pt-4">
              {myShifts.length > 0 ? (
                myShifts.map(shift => (
                  <ShiftCard key={shift.id} shift={shift} onShiftUpdate={handleShiftUpdate} onAssign={() => {}} onCreate={() => {}} />
                ))
              ) : (
                <p className="text-muted-foreground col-span-2">{t('dashboard.noShifts')}</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="open-shifts">
            <div className="grid gap-4 md:grid-cols-2 pt-4">
              {openShifts.map(shift => (
                <ShiftCard key={shift.id} shift={shift} onShiftUpdate={handleShiftUpdate} onAssign={() => {}} onCreate={() => {}} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="space-y-8">
        <Chat />
      </div>
    </div>
  )
}
