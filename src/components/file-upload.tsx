"use client"

import { useState, useEffect, useRef } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onChange: (value: string) => void
  value: string
  accept?: string
  id?: string
  className?: string
  role?: string  // Add role prop
  fieldName?: string  // Add fieldName prop
}

export const FileUpload = ({
  onChange,
  accept,
  id,
  className,
  role,
  fieldName
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)

  useEffect(() => {
    if (role && fieldName) {
      const storedFiles = JSON.parse(localStorage.getItem(`onboarding-files-${role}`) || '{}')
      if (storedFiles[fieldName]) {
        setSelectedFileName(storedFiles[fieldName])
        onChange(storedFiles[fieldName])
      }
    }
  }, [role, fieldName])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFileName(file.name)
      onChange(file.name)

      // Store in localStorage immediately
      if (role && fieldName) {
        const storedFiles = JSON.parse(localStorage.getItem(`onboarding-files-${role}`) || '{}')
        storedFiles[fieldName] = file.name
        localStorage.setItem(`onboarding-files-${role}`, JSON.stringify(storedFiles))
      }
    }
  }

  const handleRemove = () => {
    setSelectedFileName(null)
    onChange("")

    if (role && fieldName) {
      const storedFiles = JSON.parse(localStorage.getItem(`onboarding-files-${role}`) || '{}')
      delete storedFiles[fieldName]
      localStorage.setItem(`onboarding-files-${role}`, JSON.stringify(storedFiles))
    }
  }

  return (
    <div className={cn("mt-1", className)}>
      {selectedFileName ? (
        <div className="w-1/2 h-10 border-2 border-dashed border-green-300 bg-green-50 rounded-md flex items-center justify-between px-3">
          <span className="text-sm text-green-700 truncate">{selectedFileName}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-green-600 hover:text-green-800"
            onClick={handleRemove}
          >
            ×
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-1/2 h-9 border-2 border-dashed border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-600"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          (Pdf only)
        </Button>
      )}
      <input
        ref={fileInputRef}
        id={id}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
