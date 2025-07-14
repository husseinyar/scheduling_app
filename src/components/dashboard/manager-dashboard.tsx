"use client"

import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import initialShifts from "@/lib/data/shifts.json"
import allUsers from "@/lib/data/users.json"
import { ShiftCard } from "./shift-card"
import { Chat } from "./chat"

export type Shift = typeof initialShifts[0]

export default function ManagerDashboard() {
  const { t } = useTranslation()
  const [shifts, setShifts] = useState<Shift[]>(initialShifts)
  const [isAssignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null)
  
  const employees = allUsers.filter(user => user.role === 'employee')

  const handleShiftUpdate = (updatedShift: Shift) => {
    setShifts(shifts.map(s => s.id === updatedShift.id ? updatedShift : s))
  }

  const handleAssignClick = (shift: Shift) => {
    setSelectedShift(shift)
    setAssignDialogOpen(true)
  }

  const handleAssignShift = (employeeId: string) => {
    if (!selectedShift) return;
    const updatedShift = {
        ...selectedShift,
        assignedTo: employeeId,
        status: 'assigned' as const,
        applicants: []
    };
    handleShiftUpdate(updatedShift);
    setAssignDialogOpen(false);
    setSelectedShift(null);
  }

  const openShifts = shifts.filter(s => s.status !== 'assigned');
  const assignedShifts = shifts.filter(s => s.status === 'assigned');

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-4">{t('dashboard.shifts')}</h2>
        <Tabs defaultValue="open">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="open">{t('dashboard.openShifts')}</TabsTrigger>
            <TabsTrigger value="assigned">{t('shiftCard.assigned')}</TabsTrigger>
          </TabsList>
          <TabsContent value="open">
            <div className="grid gap-4 md:grid-cols-2 pt-4">
              {openShifts.map(shift => (
                <ShiftCard key={shift.id} shift={shift} onShiftUpdate={handleShiftUpdate} onAssign={handleAssignClick} onCreate={() => {}} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="assigned">
            <div className="grid gap-4 md:grid-cols-2 pt-4">
              {assignedShifts.map(shift => (
                <ShiftCard key={shift.id} shift={shift} onShiftUpdate={handleShiftUpdate} onAssign={handleAssignClick} onCreate={() => {}} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">{t('dashboard.employees')}</h2>
          <Card>
            <CardContent className="p-4 space-y-4">
              {employees.map(user => (
                <div key={user.id} className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user avatar" />
                    <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <Chat />
      </div>

       <Dialog open={isAssignDialogOpen} onOpenChange={setAssignDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('assignShift.title')}</DialogTitle>
                    <DialogDescription>{t('assignShift.description')}</DialogDescription>
                </DialogHeader>
                <AssignShiftForm onSubmit={handleAssignShift} shift={selectedShift} />
            </DialogContent>
        </Dialog>
    </div>
  )
}

function AssignShiftForm({ onSubmit, shift }: { onSubmit: (employeeId: string) => void, shift: Shift | null }) {
    const { t } = useTranslation();
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const applicants = allUsers.filter(u => shift?.applicants.includes(u.id));
    const otherEmployees = allUsers.filter(u => u.role === 'employee' && !shift?.applicants.includes(u.id));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedEmployee) {
            onSubmit(selectedEmployee);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Select onValueChange={setSelectedEmployee} value={selectedEmployee}>
                <SelectTrigger>
                    <SelectValue placeholder={t('assignShift.selectEmployee')} />
                </SelectTrigger>
                <SelectContent>
                    {applicants.length > 0 && <p className="p-2 text-xs text-muted-foreground">Sökande</p>}
                    {applicants.map(emp => (
                        <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                    ))}
                    {applicants.length > 0 && otherEmployees.length > 0 && <div className="my-1 border-t"></div>}
                    {otherEmployees.map(emp => (
                        <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button type="submit" className="w-full" disabled={!selectedEmployee}>
                {t('assignShift.button')}
            </Button>
        </form>
    );
}
