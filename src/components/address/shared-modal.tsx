// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"

// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// // import { X } from "lucide-react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { MODAL_CONFIGS, ModalType } from "@/types/property"
// import { aboutSchema, amenitiesSchema, applicationSchema, chargesSchema, educationSchema, landmarkSchema, leasingInfoSchema, parkingSchema, petFeeSchema, propertyAddressSchema, rentFrequencySchema, stationSchema, utilitiesSchema } from "@/lib/validations"
// import { Checkbox } from "../ui/checkbox"


// const getSchemaForModalType = (modalType: ModalType) => {
//   switch (modalType) {
//     case "propertyAddress":
//       return propertyAddressSchema
//     case "leasingInfo":
//       return leasingInfoSchema
//     case "charges":
//       return chargesSchema
//     case "rentFrequency":
//       return rentFrequencySchema
//     case "petFees":
//       return petFeeSchema
//     case "parking":
//       return parkingSchema
//     case "education":
//       return educationSchema
//     case "stations":
//       return stationSchema
//     case "landmarks":
//       return landmarkSchema
//     case "application":
//       return applicationSchema
//     case "about":
//       return aboutSchema
//     case "amenities":
//       return amenitiesSchema
//     case "utilities":
//       return utilitiesSchema
//     default:
//       return propertyAddressSchema
//   }
// }

// interface SharedModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onSave: (data: Record<string, any>) => void
//   modalType: ModalType | null
//   initialData?: Record<string, any>
// }

// export function SharedModal({ isOpen, onClose, onSave, modalType, initialData }: SharedModalProps) {
//   const config = modalType ? MODAL_CONFIGS[modalType] : null
//   const schema = modalType ? getSchemaForModalType(modalType) : propertyAddressSchema

//   const form = useForm<Record<string, any>>({
//     resolver: zodResolver(schema as any),
//     defaultValues: initialData || {},
//   })

//   const handleSave = (data: Record<string, any>) => {
//     onSave(data)
//     onClose()
//     form.reset()
//   }

//   if (!config || !modalType) return null

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent
//         // className="max-w-2xl"
//         className="overflow-hidden border border-gray-200 bg-white"
//       >
//         <DialogHeader
//           // className="flex flex-row items-center justify-between "
//           className="h-[54px] bg-card-heading-background border-b border-card-divider flex flex-row items-center justify-between"
//         >

//           <DialogTitle className="text-lg font-medium text-card-heading-text px-6">{config.title}</DialogTitle>
//         </DialogHeader>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4 px-6">
//             <div className={`grid gap-4 ${config.gridCols === 3
//               ? "grid-cols-3"
//               : config.gridCols === 2
//                 ? "grid-cols-2"
//                 : "grid-cols-1"
//               }`}>
//               {config.fields.map((field: { name: string; label: string; type: string; placeholder?: string; required?: boolean; gridCols?: number; options?: { value: string; label: string }[] }) => {
//                 if (field.type === 'checkboxInput') {
//                   return (
//                     <FormField
//                       key={field.name}
//                       control={form.control}
//                       name={field.name}
//                       render={({ field: formField }) => {
//                         const isChecked = formField.value === "Address (same as property)";

//                         return (
//                           <FormItem className={`${field.gridCols === 2 ? "col-span-2" : ""}`}>
//                             <div className="flex flex-col gap-2">
//                               <div className="flex items-center space-x-2">
//                                 <Checkbox
//                                   id={`${field.name}-checkbox`}
//                                   checked={isChecked}
//                                   onCheckedChange={(checked) => {
//                                     if (checked) {
//                                       form.setValue(field.name, "Address (same as property)");
//                                     } else {
//                                       form.setValue(field.name, "");
//                                     }
//                                   }}
//                                 />
//                                 <FormLabel htmlFor={`${field.name}-checkbox`}>
//                                   {field.label}
//                                   {field.required && <span className="text-red-500">*</span>}
//                                 </FormLabel>
//                               </div>
//                               {!isChecked && (
//                                 <Input
//                                   type="text"
//                                   placeholder={field.placeholder}
//                                   value={formField.value || ''}
//                                   onChange={formField.onChange}
//                                   disabled={isChecked}
//                                 />
//                               )}
//                             </div>
//                             <FormMessage />
//                           </FormItem>
//                         );
//                       }}
//                     />
//                   );
//                 }

//                 return (



//                   <FormField
//                     key={field.name}
//                     control={form.control}
//                     name={field.name}
//                     render={({ field: formField }) => (
//                       <FormItem
//                         className={`${field.gridCols === 2 ? "col-span-2" : field.gridCols === 1 ? "col-span-1" : ""}`}
//                       >
//                         <FormLabel>
//                           {field.label}
//                           {field.required && <span className="text-red-500">*</span>}
//                         </FormLabel>
//                         <FormControl>
//                           {field.type === "select" ? (
//                             <Select onValueChange={formField.onChange} value={formField.value}>
//                               <SelectTrigger>
//                                 <SelectValue placeholder={field.placeholder} />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {field.options?.map((option) => (
//                                   <SelectItem key={option.value} value={option.value}>
//                                     {option.label}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           ) : field.type === "textarea" ? (
//                             <Textarea placeholder={field.placeholder} {...formField} rows={4} />
//                           ) : (
//                             <Input type={field.type} placeholder={field.placeholder} {...formField} />
//                           )}
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 );
//               })}
//             </div>

//             <div className="flex justify-end my-6">
//               <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
//                 Add
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   )
// }

//! Test - 2

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MODAL_CONFIGS, ModalType } from "@/types/property"
import { aboutSchema, amenitiesSchema, applicationSchema, chargesSchema, educationSchema, landmarkSchema, leasingInfoSchema, parkingSchema, petFeeSchema, propertyAddressSchema, rentFrequencySchema, stationSchema, utilitiesSchema } from "@/lib/validations"
import { Checkbox } from "../ui/checkbox"
import { useEffect } from "react"

const getSchemaForModalType = (modalType: ModalType) => {
  switch (modalType) {
    case "propertyAddress":
      return propertyAddressSchema
    case "leasingInfo":
      return leasingInfoSchema
    case "charges":
      return chargesSchema
    case "rentFrequency":
      return rentFrequencySchema
    case "petFees":
      return petFeeSchema
    case "parking":
      return parkingSchema
    case "education":
      return educationSchema
    case "stations":
      return stationSchema
    case "landmarks":
      return landmarkSchema
    case "application":
      return applicationSchema
    case "about":
      return aboutSchema
    case "amenities":
      return amenitiesSchema
    case "utilities":
      return utilitiesSchema
    default:
      return propertyAddressSchema
  }
}

interface SharedModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: Record<string, any>) => void
  modalType: ModalType | null
  initialData?: Record<string, any>
}

export function SharedModal({ isOpen, onClose, onSave, modalType, initialData }: SharedModalProps) {
  const config = modalType ? MODAL_CONFIGS[modalType] : null
  const schema = modalType ? getSchemaForModalType(modalType) : propertyAddressSchema

  // Initialize form with default values
  const form = useForm<Record<string, any>>({
    resolver: zodResolver(schema as any),
    defaultValues: {
      ...(modalType === 'leasingInfo' ? { sameAsProperty: true } : {}),
      ...(initialData || {})
    },
  })

  // Watch the checkbox value for leasing info
  const sameAsProperty = useWatch({
    control: form.control,
    name: 'sameAsProperty',
    defaultValue: modalType === 'leasingInfo' ? true : undefined
  })

  // Set initial checkbox state when modal opens
  useEffect(() => {
    if (modalType === 'leasingInfo' && initialData) {
      form.setValue('sameAsProperty', initialData.sameAsProperty ?? true)
    }
  }, [initialData, modalType, form])

  const handleSave = (data: Record<string, any>) => {
    onSave(data)
    onClose()
    form.reset()
  }

  if (!config || !modalType) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden border border-gray-200 bg-white">
        <DialogHeader className="h-[54px] bg-card-heading-background border-b border-card-divider flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-medium text-card-heading-text px-6">{config.title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4 px-6">
            <div className={`grid gap-4 ${config.gridCols === 3
              ? "grid-cols-3"
              : config.gridCols === 2
                ? "grid-cols-2"
                : "grid-cols-1"
              }`}>
              {config.fields.map((field) => {
                // Special handling for leasing info address fields
                if (modalType === 'leasingInfo') {
                  // Skip address fields when checkbox is checked
                  if (field.name.startsWith('leasingAddress') && sameAsProperty) {
                    return null;
                  }

                  // Render checkbox field
                  if (field.name === 'sameAsProperty') {
                    return (
                      <FormField
                        key={field.name}
                        control={form.control}
                        name={field.name}
                        render={({ field: formField }) => (
                          <FormItem className="col-span-2 flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                id={field.name}
                                checked={formField.value}
                                onCheckedChange={formField.onChange}
                              />
                            </FormControl>
                            <FormLabel htmlFor={field.name} className="!m-0">
                              {field.label}
                              {field.required && <span className="text-red-500">*</span>}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    );
                  }
                }

                // Render all other fields
                return (
                  <FormField
                    key={field.name}
                    control={form.control}
                    name={field.name}
                    render={({ field: formField }) => (
                      <FormItem
                        className={`${field.gridCols === 2 ? "col-span-2" : field.gridCols === 1 ? "col-span-1" : ""}`}
                      >
                        <FormLabel>
                          {field.label}
                          {field.required && <span className="text-red-500">*</span>}
                        </FormLabel>
                        <FormControl>
                          {field.type === "select" ? (
                            <Select onValueChange={formField.onChange} value={formField.value}>
                              <SelectTrigger>
                                <SelectValue placeholder={field.placeholder} />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options?.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : field.type === "textarea" ? (
                            <Textarea placeholder={field.placeholder} {...formField} rows={4} />
                          ) : (
                            <Input type={field.type} placeholder={field.placeholder} {...formField} />
                          )}
                        </FormControl>
                      </FormItem>
                    )}
                  />
                );
              })}
            </div>

            <div className="flex justify-end my-6 border-t border-gray-200 pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Add
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


