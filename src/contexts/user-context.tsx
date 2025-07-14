"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import mockUsers from "@/lib/data/users.json"

export type User = {
  id: string
  name: string
  role: "admin" | "manager" | "employee"
  email: string
  avatarUrl: string
}

type UserContextType = {
  user: User | null
  login: (userId: string) => void
  logout: () => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId")
    if (storedUserId) {
      const foundUser = mockUsers.find((u) => u.id === storedUserId) as User | undefined
      if (foundUser) {
        setUser(foundUser)
      }
    }
  }, [])

  const login = (userId: string) => {
    const foundUser = mockUsers.find((u) => u.id === userId) as User | undefined
    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("userId", userId)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("userId")
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
