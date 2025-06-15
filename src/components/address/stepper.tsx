interface StepperProps {
  currentStep: number
  totalSteps: number
}

export function Stepper({ currentStep, totalSteps }: StepperProps) {
  return (
    <div className="flex items-center mb-8">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div key={index} className="flex items-center">
          <div className={`w-8 h-1 ${index < currentStep ? "bg-blue-600" : "bg-gray-300"}`} />
          {index < totalSteps - 1 && <div className="w-8 h-1 bg-gray-300" />}
        </div>
      ))}
    </div>
  )
}
