// "use client"

// import { Button } from "@/components/ui/button"
// import { Upload } from "lucide-react"
// import { cn } from "@/lib/utils"

// interface FileUploadProps {
//   id: string
//   accept?: string
//   className?: string
// }

// export function FileUpload({ id, accept, className }: FileUploadProps) {
//   return (
//     <div className={cn("mt-1", className)}>
//       <Button
//         variant="outline"
//         className="w-full h-10 border-2 border-dashed border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-600"
//         onClick={() => document.getElementById(id)?.click()}
//       >
//         <Upload className="h-4 w-4 mr-2" />
//         (Pdf only)
//       </Button>
//       <input id={id} type="file" accept={accept} className="hidden" />
//     </div>
//   )
// }

"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRef } from "react"

interface FileUploadProps {
  id: string
  accept?: string
  className?: string
  onFileSelect?: (fileName: string) => void
}

export function FileUpload({ id, accept, className, onFileSelect }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && onFileSelect) {
      onFileSelect(file.name)
    }
  }

  return (
    <div className={cn("mt-1", className)}>
      <Button
        type="button"
        variant="outline"
        className="w-full h-10 border-2 border-dashed border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-600"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-4 w-4 mr-2" />
        (Pdf only)
      </Button>
      <input ref={fileInputRef} id={id} type="file" accept={accept} className="hidden" onChange={handleFileChange} />
    </div>
  )
}
