import { Upload } from "lucide-react"

interface PhotoUploadGridProps {
  title: string
  subtitle?: string
  coverPhoto?: boolean
}

export function PhotoUploadGrid({ title, subtitle, coverPhoto }: PhotoUploadGridProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-normal text-gray-900">
          {title}
          <span className="text-red-500">*</span>
        </h3>
        {subtitle && <p className="text-base text-gray-500">{subtitle}</p>}
      </div>

      <div className="grid grid-cols-6 gap-4">
        {coverPhoto && (
          <div className="col-span-2 row-span-2">
            <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 cursor-pointer bg-white">
              <Upload className="h-6 w-6 mb-2" />
              <span className="text-sm text-center font-medium">Upload cover photo</span>
              <span className="text-xs text-gray-400">(.jpg .png only)</span>
            </div>
          </div>
        )}

        {Array.from({ length: coverPhoto ? 10 : 12 }).map((_, index) => (
          <div key={index} className="aspect-square">
            <div className="border-2 border-dashed border-gray-300 rounded-lg h-full flex items-center justify-center text-gray-500 hover:border-gray-400 cursor-pointer bg-white">
              <Upload className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
