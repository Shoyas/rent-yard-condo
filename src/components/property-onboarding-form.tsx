// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"

// import { useEffect, useState } from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm, type SubmitHandler } from "react-hook-form"
// import * as z from "zod"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
// import { PropertyTypeSelector } from "@/components/property-type-selector"
// import { RoleSelector } from "@/components/role-selector"
// import { FileUpload } from "@/components/file-upload"
// // import { Building, Home, Building2, Key, Users, Briefcase } from 'lucide-react'
// import Image from "next/image"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// export type PropertyType = "single-house" | "apartments" | "condominiums"
// export type UserRole = "landlord" | "realtor" | "property-management"

// const baseSchema = z.object({
//   propertyType: z.enum(["single-house", "apartments", "condominiums"]),
//   userRole: z.enum(["landlord", "realtor", "property-management"]),
//   acceptTerms: z.boolean().refine((val) => val === true, {
//     message: "You must accept the terms and conditions",
//   }),
// })

// const landlordSchema = baseSchema.extend({
//   ownershipDoc: z.string().min(1, "Ownership document is required"),
// })

// const realtorSchema = baseSchema.extend({
//   licenseNumber: z.string().min(1, "License number is required"),
//   additionalDocs: z.string().optional(),
//   landlordAgreement: z.string().min(1, "Agreement with landlord is required"),
// })

// const propertyManagementSchema = baseSchema.extend({
//   companyName: z.string().min(1, "Company name is required"),
//   companyIdentifier: z.string().min(1, "Company identifier is required"),
//   jobTitle: z.string().min(1, "Job title is required"),
//   landlordAgreement: z.string().min(1, "Agreement with landlord/owner is required"),
//   country: z.string().min(1, "Country/Region is required"),
//   streetAddress: z.string().min(1, "Street address is required"),
//   aptSuite: z.string().optional(),
//   phoneCountry: z.string().min(1, "Phone country code is required"),
//   phoneNumber: z.string().min(1, "Phone number is required"),
//   contactEmail: z.string().email("Please enter a valid email address"),
//   city: z.string().min(1, "City/Town is required"),
//   state: z.string().min(1, "State/Territory is required"),
//   zipCode: z.string().min(1, "Zip code is required"),
// })

// type FormData =
//   | z.infer<typeof landlordSchema>
//   | z.infer<typeof realtorSchema>
//   | z.infer<typeof propertyManagementSchema>

// export function PropertyOnboardingForm() {
//   const [propertyType, setPropertyType] = useState<PropertyType | undefined>(undefined)
//   const [userRole, setUserRole] = useState<UserRole | undefined>(undefined)
//   const router = useRouter();

//   // Initialize form with localStorage data
//   useEffect(() => {
//     if (userRole) {
//       const savedData = localStorage.getItem(`onboarding-data-${userRole}`)
//       if (savedData) {
//         form.reset(JSON.parse(savedData))
//       }
//     }
//   }, [userRole])

//   // Get the appropriate schema based on user role
//   const getSchema = () => {
//     if (!userRole) return baseSchema

//     switch (userRole) {
//       case "landlord":
//         return landlordSchema
//       case "realtor":
//         return realtorSchema
//       case "property-management":
//         return propertyManagementSchema
//       default:
//         return baseSchema
//     }
//   }

//   const form = useForm<FormData>({
//     resolver: zodResolver(getSchema()) as any,
//     defaultValues: {
//       propertyType: undefined,
//       userRole: undefined,
//       acceptTerms: false,
//     },
//   })

//   // ! Update form values when role changes
//   const handleRoleChange = (newRole: UserRole) => {
//     setUserRole(newRole)
//     form.setValue("userRole", newRole)
//     // ! Reset form validation when role changes
//     form.clearErrors()
//   }

//   const handlePropertyTypeChange = (newType: string) => {
//     setPropertyType(newType as PropertyType)
//     form.setValue("propertyType", newType as PropertyType)
//   }

//   const onSubmit = (data: FormData) => {
//     console.log(`Form data for ${userRole}:`, data)

//     switch (userRole) {
//       case "landlord":
//         console.log("Landlord form submitted:", {
//           propertyType: data.propertyType,
//           userRole: data.userRole,
//           ownershipDoc: (data as z.infer<typeof landlordSchema>).ownershipDoc,
//           acceptTerms: data.acceptTerms,
//         })
//         // Remove local storage data for the current user role
//         if (userRole) {
//           localStorage.removeItem(`onboarding-data-${userRole}`);
//         }
//         //! Navigate to the address page
//         router.push("/address");
//         break
//       case "realtor":
//         const realtorData = data as z.infer<typeof realtorSchema>
//         console.log("Realtor form submitted:", {
//           propertyType: data.propertyType,
//           userRole: data.userRole,
//           licenseNumber: realtorData.licenseNumber,
//           additionalDocs: realtorData.additionalDocs,
//           landlordAgreement: realtorData.landlordAgreement,
//           acceptTerms: data.acceptTerms,
//         })
//         if (userRole) {
//           localStorage.removeItem(`onboarding-data-${userRole}`);
//         }
//         break
//       case "property-management":
//         const pmData = data as z.infer<typeof propertyManagementSchema>
//         console.log("Property Management form submitted:", {
//           propertyType: data.propertyType,
//           userRole: data.userRole,
//           companyInfo: {
//             companyName: pmData.companyName,
//             companyIdentifier: pmData.companyIdentifier,
//             jobTitle: pmData.jobTitle,
//             landlordAgreement: pmData.landlordAgreement,
//             country: pmData.country,
//             streetAddress: pmData.streetAddress,
//             aptSuite: pmData.aptSuite,
//             phoneCountry: pmData.phoneCountry,
//             phoneNumber: pmData.phoneNumber,
//             contactEmail: pmData.contactEmail,
//             city: pmData.city,
//             state: pmData.state,
//             zipCode: pmData.zipCode,
//           },
//           acceptTerms: data.acceptTerms,
//         })
//         if (userRole) {
//           localStorage.removeItem(`onboarding-data-${userRole}`);
//         }
//         break
//     }
//   }

//   const propertyTypes = [
//     {
//       id: "single-house" as PropertyType,
//       title: "Single House Property",
//       description: "Single unit house for single family",
//       icon: <Image src="/images/Badge-1.png" alt="Single House Property" width={56} height={56} />,
//     },
//     {
//       id: "apartments" as PropertyType,
//       title: "Apartments complex",
//       description: "Multiple unit house for families",
//       icon: <Image src="/images/Badge-2.png" alt="Apartments complex" width={56} height={56} />,
//     },
//     {
//       id: "condominiums" as PropertyType,
//       title: "Condominiums",
//       description: "Multiple unit house for families",
//       icon: <Image src="/images/Badge-3.png" alt="Condominiums" width={56} height={56} />,
//     },
//   ]

//   const userRoles = [
//     {
//       id: "landlord" as UserRole,
//       title: "Landlord",
//       description: "Owner of the property",
//       // icon: Key,
//       icon: <Image src="/images/Badge-4.png" alt="Landlord" width={56} height={56} />,
//     },
//     {
//       id: "realtor" as UserRole,
//       title: "Realtor",
//       description: "Manage property on behalf on owner",
//       // icon: Users,
//       icon: <Image src="/images/Badge-5.png" alt="Realtor" width={56} height={56} />,
//     },
//     {
//       id: "property-management" as UserRole,
//       title: "Property management company",
//       description: "For management company",
//       // icon: Briefcase,
//       icon: <Image src="/images/Badge-6.png" alt="Property Management" width={56} height={56} />,
//     },
//   ]

//   return (
//     <div className="flex flex-col min-h-screen" >
//       {/* ! Header Section */}
//       <div className="w-full border-b-[1px] border-[#E0E0E0] h-20 mb-10">
//         <div className="container flex items-center justify-between px-20 py-6">
//           <Link href="/" className="flex items-center space-x-2">
//             <Image src="/images/logo.png" alt="RentYard Logo" width={148} height={39} />
//           </Link>
//           <Button variant="outline" className="text-[#272B35] text-base">
//             Save & Exit
//           </Button>
//         </div>
//       </div>

//       <div className="container mx-auto px-20 py-6 ">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit as SubmitHandler<any>)} className="space-y-8">
//             {/* ! Property Type Section */}
//             <div className="mb-8">
//               <h2 className="text-2xl font-bold text-heading-black mb-6">Property type</h2>
//               <PropertyTypeSelector
//                 options={propertyTypes}
//                 value={propertyType || ""}
//                 onChange={handlePropertyTypeChange}
//               />
//             </div>

//             {/* ! Role Selection Section */}
//             <div className="mb-8">
//               <h2 className="text-2xl font-bold text-heading-black mb-6">Select your role</h2>
//               <RoleSelector
//                 options={userRoles}
//                 value={userRole || ""}
//                 onChange={(newRole: string) => handleRoleChange(newRole as UserRole)}
//               />
//             </div>

//             {/* ! Conditional Content Based on Property Type and Role */}
//             {propertyType === "condominiums" && userRole === "landlord" && (
//               <div className="mb-8">
//                 <Card className="overflow-hidden border border-gray-200 bg-white">
//                   <div className="h-[54px] bg-card-heading-background border-b border-card-divider flex items-center px-6 -mt-6">
//                     <h5 className="text-lg font-medium text-card-heading-text">Proof of ownership</h5>
//                   </div>
//                   <div className="px-6 space-y-0">
//                     <FormField
//                       control={form.control}
//                       name="ownershipDoc"
//                       render={({ field }) => (
//                         <FormItem className="space-y-2">
//                           <FormLabel>Ownership doc*</FormLabel>
//                           <FormControl>
//                             <FileUpload
//                               role={userRole}
//                               fieldName="ownershipDoc"
//                               accept=".pdf"
//                               value={field.value || ""}
//                               onChange={field.onChange}
//                             />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </Card>
//               </div>
//             )}

//             {propertyType === "condominiums" && userRole === "realtor" && (
//               <div className="mb-8">
//                 <Card className="overflow-hidden border border-gray-200 bg-white">
//                   <div className="h-[54px] bg-card-heading-background border-b border-card-divider flex items-center px-6 -mt-6">
//                     <h5 className="text-lg font-medium text-card-heading-text">Realtor verification</h5>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6">
//                     <FormField
//                       control={form.control}
//                       name="licenseNumber"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-medium text-gray-700">License number*</FormLabel>
//                           <FormControl>
//                             <Input placeholder="000000000000" {...field} />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="additionalDocs"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-medium text-gray-700">
//                             Additional documents for realtor
//                           </FormLabel>
//                           <FormControl>
//                             <FileUpload
//                               // id="additional-docs"
//                               role={userRole}
//                               fieldName="additionalDocs"
//                               accept=".pdf"
//                               value={field.value || ""}
//                               onChange={(fileName) => field.onChange(fileName)}
//                             />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="landlordAgreement"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Agreement with landlord*</FormLabel>
//                           <FormControl>
//                             <FileUpload
//                               role={userRole}
//                               fieldName="landlordAgreement"
//                               accept=".pdf"
//                               value={field.value || ""}
//                               onChange={field.onChange}
//                             />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </Card>
//               </div>
//             )}

//             {propertyType === "condominiums" && userRole === "property-management" && (
//               <div className="mb-8">
//                 <Card className="overflow-hidden border border-gray-200 bg-white">
//                   <div className="h-[54px] bg-card-heading-background border-b border-card-divider flex items-center px-6 -mt-6">
//                     <h5 className="text-lg font-medium text-card-heading-text">Company & office info</h5>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6">
//                     <FormField
//                       control={form.control}
//                       name="companyName"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-medium text-gray-700">Company name*</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Bunyan trade center" {...field} />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="companyIdentifier"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-medium text-gray-700">
//                             Company identifier(EIN/TIN)*
//                           </FormLabel>
//                           <FormControl>
//                             <Input placeholder="Name" {...field} />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="jobTitle"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-medium text-gray-700">Your job title*</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Manager" {...field} />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="landlordAgreement"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-medium text-gray-700">
//                             Agreement with landlord/owner*
//                           </FormLabel>
//                           <FormControl>
//                             <FileUpload
//                               // id="agreement"
//                               role={userRole}
//                               fieldName="landlordAgreement"
//                               accept=".pdf"
//                               value={field.value || ""}
//                               onChange={(fileName) => field.onChange(fileName)}
//                             />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="country"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-medium text-gray-700">Country/Region*</FormLabel>
//                           <Select onValueChange={field.onChange} defaultValue={field.value}>
//                             <FormControl>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Choose country" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               <SelectItem value="us">United States</SelectItem>
//                               <SelectItem value="ca">Canada</SelectItem>
//                               <SelectItem value="uk">United Kingdom</SelectItem>
//                             </SelectContent>
//                           </Select>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="streetAddress"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-medium text-gray-700">Street address*</FormLabel>
//                           <FormControl>
//                             <Input placeholder="111 Austin Ave" {...field} />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="aptSuite"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-medium text-gray-700">
//                             Apt, suit, unit (if applicable)
//                           </FormLabel>
//                           <FormControl>
//                             <Input placeholder="3050" {...field} />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="phoneNumber"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-medium text-gray-700">Phone number*</FormLabel>
//                           <div className="flex space-x-2">
//                             <FormField
//                               control={form.control}
//                               name="phoneCountry"
//                               render={({ field: countryField }) => (
//                                 <Select onValueChange={countryField.onChange} defaultValue={countryField.value}>
//                                   <FormControl>
//                                     <SelectTrigger className="w-20">
//                                       <SelectValue placeholder="🇺🇸" />
//                                     </SelectTrigger>
//                                   </FormControl>
//                                   <SelectContent>
//                                     <SelectItem value="us">🇺🇸</SelectItem>
//                                     <SelectItem value="ca">🇨🇦</SelectItem>
//                                     <SelectItem value="uk">🇬🇧</SelectItem>
//                                   </SelectContent>
//                                 </Select>
//                               )}
//                             />
//                             <FormControl>
//                               <Input placeholder="+880" className="flex-1" {...field} />
//                             </FormControl>
//                           </div>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="contactEmail"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-medium text-gray-700">Contact email*</FormLabel>
//                           <FormControl>
//                             <Input type="email" placeholder="majarul0225@gmail.com" {...field} />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="city"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-medium text-gray-700">City/Town*</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Dallas" {...field} />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="state"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-medium text-gray-700">State/Territory*</FormLabel>
//                           <Select onValueChange={field.onChange} defaultValue={field.value}>
//                             <FormControl>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Choose state" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               <SelectItem value="tx">Texas</SelectItem>
//                               <SelectItem value="ca">California</SelectItem>
//                               <SelectItem value="ny">New York</SelectItem>
//                             </SelectContent>
//                           </Select>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="zipCode"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-medium text-gray-700">Zip code*</FormLabel>
//                           <FormControl>
//                             <Input placeholder="75061" {...field} />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </Card>
//               </div>
//             )}

//             {/* ! Show nothing for other property types */}
//             {propertyType && propertyType !== "condominiums" && (
//               <div className="mb-8 text-center py-12 bg-gray-50 rounded-lg">
//                 <p className="text-gray-500">
//                   Onboarding for {propertyType === "apartments" ? "Apartments complex" : "Single House Property"}
//                   is not currently available
//                 </p>
//               </div>
//             )}

//             {/* ! Terms and Conditions */}
//             <FormField
//               control={form.control}
//               name="acceptTerms"
//               render={({ field }: any) => (
//                 <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//                   <FormControl>
//                     <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel className="text-sm text-gray-700">
//                       Accept RentYard property adding terms & condition
//                     </FormLabel>
//                   </div>
//                 </FormItem>
//               )}
//             />

//             {/* ! Footer Buttons */}
//             {/* <div className="flex items-center justify-between">
//               <Button type="button" variant="ghost" className="text-gray-600">
//                 Back
//               </Button>
//               <Button
//                 type="submit"
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6"
//                 disabled={!propertyType || !userRole}
//               >
//                 Get started
//               </Button>
//             </div> */}
//           </form>
//         </Form>

//       </div>
//       {/* Sticky Footer Buttons */}
//       <div className="mt-8 py-4 bg-white shadow-2xl fixed bottom-0 left-0 w-full z-10">
//         <div className="container flex items-center justify-between px-20 py-6">
//           <Button type="button" variant="ghost" className="text-gray-600 underline">
//             Back
//           </Button>
//           <Button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6"
//             disabled={!propertyType || !userRole}
//           >
//             Get started
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { PropertyTypeSelector } from "@/components/property-type-selector"
import { RoleSelector } from "@/components/role-selector"
import { FileUpload } from "@/components/file-upload"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PhoneInput } from "./ui/phone-input"

export type PropertyType = "single-house" | "apartments" | "condominiums"
export type UserRole = "landlord" | "realtor" | "property-management"

const baseSchema = z.object({
  propertyType: z.enum(["single-house", "apartments", "condominiums"]),
  userRole: z.enum(["landlord", "realtor", "property-management"]),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
})

const landlordSchema = baseSchema.extend({
  ownershipDoc: z.string().min(1, "Ownership document is required"),
})

const realtorSchema = baseSchema.extend({
  licenseNumber: z.string().min(1, "License number is required"),
  additionalDocs: z.string().optional(),
  landlordAgreement: z.string().min(1, "Agreement with landlord is required"),
})

const propertyManagementSchema = baseSchema.extend({
  companyName: z.string().min(1, "Company name is required"),
  companyIdentifier: z.string().min(1, "Company identifier is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  landlordAgreement: z.string().min(1, "Agreement with landlord/owner is required"),
  country: z.string().min(1, "Country/Region is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  aptSuite: z.string().optional(),
  phoneCountry: z.string().min(1, "Phone country code is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  contactEmail: z.string().email("Please enter a valid email address"),
  city: z.string().min(1, "City/Town is required"),
  state: z.string().min(1, "State/Territory is required"),
  zipCode: z.string().min(1, "Zip code is required"),
})

type FormData =
  | z.infer<typeof landlordSchema>
  | z.infer<typeof realtorSchema>
  | z.infer<typeof propertyManagementSchema>

export function PropertyOnboardingForm() {
  const [propertyType, setPropertyType] = useState<PropertyType | undefined>(undefined)
  const [userRole, setUserRole] = useState<UserRole | undefined>(undefined)
  const router = useRouter();
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  // Initialize form with localStorage data
  useEffect(() => {
    if (userRole) {
      const savedData = localStorage.getItem(`onboarding-data-${userRole}`)
      if (savedData) {
        form.reset(JSON.parse(savedData))
      }
    }
  }, [userRole])

  // Get the appropriate schema based on user role
  const getSchema = () => {
    if (!userRole) return baseSchema

    switch (userRole) {
      case "landlord":
        return landlordSchema
      case "realtor":
        return realtorSchema
      case "property-management":
        return propertyManagementSchema
      default:
        return baseSchema
    }
  }

  const form = useForm<FormData>({
    resolver: zodResolver(getSchema()) as any,
    defaultValues: {
      propertyType: undefined,
      userRole: undefined,
      acceptTerms: false,
    },
  })

  // Handle role change
  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole)
    form.setValue("userRole", newRole)
    form.clearErrors()
  }

  const handlePropertyTypeChange = (newType: string) => {
    setPropertyType(newType as PropertyType)
    form.setValue("propertyType", newType as PropertyType)
  }

  const onSubmit = (data: FormData) => {
    console.log(`Form data for ${userRole}:`, data)

    switch (userRole) {
      case "landlord":
        console.log("Landlord form submitted:", {
          propertyType: data.propertyType,
          userRole: data.userRole,
          ownershipDoc: (data as z.infer<typeof landlordSchema>).ownershipDoc,
          acceptTerms: data.acceptTerms,
        });
        if (userRole) {
          localStorage.removeItem(`onboarding-data-${userRole}`);
        }
        router.push("/address");
        break;
      case "realtor":
        const realtorData = data as z.infer<typeof realtorSchema>
        console.log("Realtor form submitted:", {
          propertyType: data.propertyType,
          userRole: data.userRole,
          licenseNumber: realtorData.licenseNumber,
          additionalDocs: realtorData.additionalDocs,
          landlordAgreement: realtorData.landlordAgreement,
          acceptTerms: data.acceptTerms,
        });
        if (userRole) {
          localStorage.removeItem(`onboarding-data-${userRole}`);
        }
        break;
      case "property-management":
        const pmData = data as z.infer<typeof propertyManagementSchema>
        console.log("Property Management form submitted:", {
          propertyType: data.propertyType,
          userRole: data.userRole,
          companyInfo: {
            companyName: pmData.companyName,
            companyIdentifier: pmData.companyIdentifier,
            jobTitle: pmData.jobTitle,
            landlordAgreement: pmData.landlordAgreement,
            country: pmData.country,
            streetAddress: pmData.streetAddress,
            aptSuite: pmData.aptSuite,
            phoneCountry: pmData.phoneCountry,
            phoneNumber: pmData.phoneNumber,
            contactEmail: pmData.contactEmail,
            city: pmData.city,
            state: pmData.state,
            zipCode: pmData.zipCode,
          },
          acceptTerms: data.acceptTerms,
        });
        if (userRole) {
          localStorage.removeItem(`onboarding-data-${userRole}`);
        }
        break;
    }
  }

  const propertyTypes = [
    {
      id: "single-house" as PropertyType,
      title: "Single House Property",
      description: "Single unit house for single family",
      icon: <Image src="/images/Badge-1.png" alt="Single House Property" width={56} height={56} />,
    },
    {
      id: "apartments" as PropertyType,
      title: "Apartments complex",
      description: "Multiple unit house for families",
      icon: <Image src="/images/Badge-2.png" alt="Apartments complex" width={56} height={56} />,
    },
    {
      id: "condominiums" as PropertyType,
      title: "Condominiums",
      description: "Multiple unit house for families",
      icon: <Image src="/images/Badge-3.png" alt="Condominiums" width={56} height={56} />,
    },
  ]

  const userRoles = [
    {
      id: "landlord" as UserRole,
      title: "Landlord",
      description: "Owner of the property",
      icon: <Image src="/images/Badge-4.png" alt="Landlord" width={56} height={56} />,
    },
    {
      id: "realtor" as UserRole,
      title: "Realtor",
      description: "Manage property on behalf on owner",
      icon: <Image src="/images/Badge-5.png" alt="Realtor" width={56} height={56} />,
    },
    {
      id: "property-management" as UserRole,
      title: "Property management company",
      description: "For management company",
      icon: <Image src="/images/Badge-6.png" alt="Property Management" width={56} height={56} />,
    },
  ]

  // Handle sticky footer button click
  const handleStickySubmit = () => {
    if (submitButtonRef.current) {
      submitButtonRef.current.click();
    }
  };

  return (
    <div className="flex flex-col min-h-screen" >
      {/* Header Section */}
      <div className="w-full border-b-[1px] border-[#E0E0E0] h-20 mb-10">
        <div className="container flex items-center justify-between px-20 py-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/logo.png" alt="RentYard Logo" width={148} height={39} />
          </Link>
          <Button variant="outline" className="text-[#272B35] text-base">
            Save & Exit
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-20 py-6 pb-24">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit as SubmitHandler<any>)} className="space-y-8">
            {/* Property Type Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-heading-black mb-6">Property type</h2>
              <PropertyTypeSelector
                options={propertyTypes}
                value={propertyType || ""}
                onChange={handlePropertyTypeChange}
              />
            </div>

            {/* Role Selection Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-heading-black mb-6">Select your role</h2>
              <RoleSelector
                options={userRoles}
                value={userRole || ""}
                onChange={(newRole: string) => handleRoleChange(newRole as UserRole)}
              />
            </div>

            {/* Conditional Content Based on Property Type and Role */}
            {propertyType === "condominiums" && userRole === "landlord" && (
              <div className="mb-8">
                <Card className="overflow-hidden border border-gray-200 bg-white">
                  <div className="h-[54px] bg-card-heading-background border-b border-card-divider flex items-center px-6 -mt-6">
                    <h5 className="text-lg font-medium text-card-heading-text">Proof of ownership</h5>
                  </div>
                  <div className="px-6 space-y-0">
                    <FormField
                      control={form.control}
                      name="ownershipDoc"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Ownership doc*</FormLabel>
                          <FormControl>
                            <FileUpload
                              role={userRole}
                              fieldName="ownershipDoc"
                              accept=".pdf"
                              value={field.value || ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
              </div>
            )}

            {propertyType === "condominiums" && userRole === "realtor" && (
              <div className="mb-8">
                <Card className="overflow-hidden border border-gray-200 bg-white">
                  <div className="h-[54px] bg-card-heading-background border-b border-card-divider flex items-center px-6 -mt-6">
                    <h5 className="text-lg font-medium text-card-heading-text">Realtor verification</h5>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6">
                    <FormField
                      control={form.control}
                      name="licenseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">License number*</FormLabel>
                          <FormControl>
                            <Input placeholder="000000000000" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="additionalDocs"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Additional documents for realtor
                          </FormLabel>
                          <FormControl>
                            <FileUpload
                              role={userRole}
                              fieldName="additionalDocs"
                              accept=".pdf"
                              value={field.value || ""}
                              onChange={(fileName) => field.onChange(fileName)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="landlordAgreement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agreement with landlord*</FormLabel>
                          <FormControl>
                            <FileUpload
                              role={userRole}
                              fieldName="landlordAgreement"
                              accept=".pdf"
                              value={field.value || ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
              </div>
            )}

            {propertyType === "condominiums" && userRole === "property-management" && (
              <div className="mb-8">
                <Card className="overflow-hidden border border-gray-200 bg-white">
                  <div className="h-[54px] bg-card-heading-background border-b border-card-divider flex items-center px-6 -mt-6">
                    <h5 className="text-lg font-medium text-card-heading-text">Company & office info</h5>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Company name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Bunyan trade center" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyIdentifier"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Company identifier(EIN/TIN)*
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Your job title*</FormLabel>
                          <FormControl>
                            <Input placeholder="Manager" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="landlordAgreement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Agreement with landlord/owner*
                          </FormLabel>
                          <FormControl>
                            <FileUpload
                              role={userRole}
                              fieldName="landlordAgreement"
                              accept=".pdf"
                              value={field.value || ""}
                              onChange={(fileName) => field.onChange(fileName)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Country/Region*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="streetAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Street address*</FormLabel>
                          <FormControl>
                            <Input placeholder="111 Austin Ave" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="aptSuite"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Apt, suit, unit (if applicable)
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="3050" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {/* <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Phone number*</FormLabel>
                          <div className="flex space-x-2">
                            <FormField
                              control={form.control}
                              name="phoneCountry"
                              render={({ field: countryField }) => (
                                <Select onValueChange={countryField.onChange} defaultValue={countryField.value}>
                                  <FormControl>
                                    <SelectTrigger className="w-20">
                                      <SelectValue placeholder="🇺🇸" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="us">🇺🇸</SelectItem>
                                    <SelectItem value="ca">🇨🇦</SelectItem>
                                    <SelectItem value="uk">🇬🇧</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            <FormControl>
                              <Input placeholder="+880" className="flex-1" {...field} />
                            </FormControl>
                          </div>
                        </FormItem>
                      )}
                    /> */}
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Phone number*</FormLabel>
                          <FormControl className="w-full">
                            <PhoneInput
                              placeholder="Placeholder"
                              {...field}
                              defaultCountry="BD"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Contact email*</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="majarul0225@gmail.com" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">City/Town*</FormLabel>
                          <FormControl>
                            <Input placeholder="Dallas" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">State/Territory*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="tx">Texas</SelectItem>
                              <SelectItem value="ca">California</SelectItem>
                              <SelectItem value="ny">New York</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Zip code*</FormLabel>
                          <FormControl>
                            <Input placeholder="75061" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
              </div>
            )}

            {/* Show nothing for other property types */}
            {propertyType && propertyType !== "condominiums" && (
              <div className="mb-8 text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  Onboarding for {propertyType === "apartments" ? "Apartments complex" : "Single House Property"}
                  is not currently available
                </p>
              </div>
            )}

            {/* Terms and Conditions */}
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }: any) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-gray-700">
                      Accept RentYard property adding terms & condition
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* Hidden submit button for form submission */}
            <button
              type="submit"
              ref={submitButtonRef}
              className="hidden"
              disabled={!propertyType || !userRole}
            >
              Submit
            </button>
          </form>
        </Form>
      </div>

      {/* Sticky Footer Buttons */}
      <div className="bg-white shadow-2xl fixed bottom-0 left-0 w-full z-10">
        <div className="container flex items-center justify-between px-20 py-6">
          <Button type="button" variant="ghost" className="text-gray-600 underline">
            Back
          </Button>
          <Button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            disabled={!propertyType || !userRole}
            onClick={handleStickySubmit}
          >
            Get started
          </Button>
        </div>
      </div>
    </div>
  )
}
