"use client"

import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle } from "lucide-react"

import initialShifts from "@/lib/data/shifts.json"
import allUsers from "@/lib/data/users.json"
import { ShiftCard } from "./shift-card"

export type Shift = typeof initialShifts[0]

export default function AdminDashboard() {
  const { t } = useTranslation()
  const [shifts, setShifts] = useState<Shift[]>(initialShifts)
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false)
  const [isAssignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null)

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
        status: 'assigned' as const
    };
    handleShiftUpdate(updatedShift);
    setAssignDialogOpen(false);
    setSelectedShift(null);
  }

  const handleCreateShift = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newShift: Shift = {
      id: `s-${Date.now()}`,
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      start: formData.get('start') as string,
      end: formData.get('end') as string,
      assignedTo: null,
      status: 'open',
      applicants: []
    };
    setShifts([newShift, ...shifts]);
    setCreateDialogOpen(false);
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{t('dashboard.allShifts')}</h2>
          <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('createShift.title')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('createShift.title')}</DialogTitle>
                <DialogDescription>{t('createShift.description')}</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateShift} className="space-y-4">
                <div>
                  <Label htmlFor="title">{t('createShift.shiftTitle')}</Label>
                  <Input id="title" name="title" placeholder={t('createShift.shiftTitlePlaceholder')} required />
                </div>
                <div>
                  <Label htmlFor="date">{t('createShift.date')}</Label>
                  <Input id="date" name="date" type="date" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start">{t('createShift.startTime')}</Label>
                    <Input id="start" name="start" type="time" required />
                  </div>
                  <div>
                    <Label htmlFor="end">{t('createShift.endTime')}</Label>
                    <Input id="end" name="end" type="time" required />
                  </div>
                </div>
                <Button type="submit" className="w-full">{t('createShift.button')}</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {shifts.map(shift => (
            <ShiftCard key={shift.id} shift={shift} onShiftUpdate={handleShiftUpdate} onAssign={handleAssignClick} onCreate={() => setCreateDialogOpen(true)} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">{t('dashboard.allUsers')}</h2>
        <Card>
          <CardContent className="p-0">
            <div className="space-y-4 p-4">
              {allUsers.map(user => (
                <div key={user.id} className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user avatar" />
                    <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{t(`roles.${user.role}`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

       <Dialog open={isAssignDialogOpen} onOpenChange={setAssignDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('assignShift.title')}</DialogTitle>
                    <DialogDescription>{t('assignShift.description')}</DialogDescription>
                </DialogHeader>
                <AssignShiftForm onSubmit={handleAssignShift} />
            </DialogContent>
        </Dialog>
    </div>
  )
}

function AssignShiftForm({ onSubmit }: { onSubmit: (employeeId: string) => void }) {
    const { t } = useTranslation();
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const employees = allUsers.filter(u => u.role === 'employee');

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
                    {employees.map(emp => (
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