"use client"

import { useUser } from "@/hooks/use-user"
import AdminDashboard from "@/components/dashboard/admin-dashboard"
import ManagerDashboard from "@/components/dashboard/manager-dashboard"
import EmployeeDashboard from "@/components/dashboard/employee-dashboard"

export default function DashboardPage() {
  const { user } = useUser()

  if (!user) return null

  return (
    <>
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'manager' && <ManagerDashboard />}
      {user.role === 'employee' && <EmployeeDashboard />}
    </>
  )
}
