"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import React from "react"
// import type { LucideIcon } from "lucide-react"

interface PropertyTypeOption {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

interface PropertyTypeSelectorProps {
  options: PropertyTypeOption[]
  value: string
  onChange: (value: string) => void
}

export function PropertyTypeSelector({ options, value, onChange }: PropertyTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {options.map((option) => {
        const Icon = option.icon
        return (
          <Card
            key={option.id}
            className={cn(
              "p-5 cursor-pointer transition-all border-[1px]",
              value === option.id ? "border-card-border-blue bg-card-background" : "border-card-border-gray",
            )}
            onClick={() => onChange(option.id)}
          >
            <div className="flex items-start space-x-4">
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
