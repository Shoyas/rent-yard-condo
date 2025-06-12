"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface RoleOption {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

interface RoleSelectorProps {
  options: RoleOption[]
  value: string
  onChange: (value: string) => void
}

export function RoleSelector({ options, value, onChange }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {options.map((option) => {
        const Icon = option.icon
        return (
          <Card
            key={option.id}
            className={cn(
              "p-4 cursor-pointer transition-all hover:shadow-md border-2",
              value === option.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300",
            )}
            onClick={() => onChange(option.id)}
          >
            <div className="flex items-start space-x-3">
              <div className={cn("p-2 rounded-lg", value === option.id ? "bg-blue-100" : "bg-gray-100")}>
                <Icon className={cn("h-5 w-5", value === option.id ? "text-blue-600" : "text-gray-600")} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 text-sm">{option.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{option.description}</p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
