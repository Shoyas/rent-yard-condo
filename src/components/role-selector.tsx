"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface RoleOption {
  id: string
  title: string
  description: string
  icon: React.ReactNode
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
              "p-4 cursor-pointer transition-all border-[1px]",
              value === option.id ? "border-card-border-blue bg-card-background" : "border-card-border-gray",
            )}
            onClick={() => onChange(option.id)}
          >
            <div className="flex items-start space-x-4">
              {/* <div className={cn("p-2 rounded-lg", value === option.id ? "bg-blue-100" : "bg-gray-100")}>
                <Icon className={cn("h-5 w-5", value === option.id ? "text-blue-600" : "text-gray-600")} />
              </div> */}
              <div>
                {Icon}
              </div>
              <div className="flex-1 space-y-1.5">
                <h3 className="font-semibold text-heading-black text-base">{option.title}</h3>
                <p className="font-medium text-sm text-description-text-gray mt-1.5">{option.description}</p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
