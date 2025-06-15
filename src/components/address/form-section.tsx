"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"

interface FormSectionProps {
  title: string
  isRequired?: boolean
  hasData?: boolean
  onAdd: () => void
  onEdit?: () => void
  onDelete?: () => void
  children?: React.ReactNode
}

export function FormSection({
  title,
  isRequired = false,
  hasData = false,
  onAdd,
  onEdit,
  onDelete,
  children,
}: FormSectionProps) {
  return (
    <div className="border border-gray-200 p-5 rounded-3xl mb-4 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">
            {title}
            {isRequired && <span className="text-red-500">(Required)</span>}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {hasData ? (
            <>
              {onEdit && (
                <Button variant="ghost" size="sm" onClick={onEdit} className="text-blue-600 hover:text-blue-700">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button variant="ghost" size="sm" onClick={onDelete} className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </>
          ) : (
            <Button variant="ghost" size="sm" onClick={onAdd} className="text-blue-600 hover:text-blue-700">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          )}
        </div>
      </div>

      {hasData && children && <div className="mt-3 text-sm text-gray-600">{children}</div>}
    </div>
  )
}
