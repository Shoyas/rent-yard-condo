"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Minus } from "lucide-react"
import { Charges, LeasingInfo, ModalType, PetFee, PropertyAddress, RentFrequency, } from "@/types/property"
import { FormSection } from "@/components/address/form-section"
import { PricingStep } from "@/components/address/pricing-step"
import { SharedModal } from "@/components/address/shared-modal"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/localStorage"
import { CompleteForm, completeFormSchema } from "@/lib/validations"
import Image from "next/image"
import Link from "next/link"

const AddressPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const form = useForm<CompleteForm>({
    resolver: zodResolver(completeFormSchema),
    defaultValues: getFromLocalStorage(),
  })
  // Remove the old propertyData state
  // const [propertyData, setPropertyData] = useState<PropertyData>({...})
  const [activeModal, setActiveModal] = useState<ModalType | null>(null)

  const handleNext = () => {
    if (currentStep < 2) {
      // Save current form data to localStorage
      const currentData = form.getValues()
      saveToLocalStorage(currentData)
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const watchedData = form.watch()

  const renderStep1 = () => (
    <div className="min-h-screen space-y-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Add Property Information</h1>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-1">
            <FormSection
              title="Property address"
              isRequired
              hasData={!!watchedData.propertyAddress}
              onAdd={() => setActiveModal("propertyAddress")}
              onEdit={() => setActiveModal("propertyAddress")}

            >
              {watchedData.propertyAddress && (
                <div>
                  <p>{watchedData.propertyAddress.propertyName}, {watchedData.propertyAddress.propertyWebsite}, Total unit:{watchedData.propertyAddress.totalUnits}</p>
                  <p>
                    {watchedData.propertyAddress.zipCode}, {watchedData.propertyAddress.streetAddress}, {watchedData.propertyAddress.cityTown}, {watchedData.propertyAddress.country}
                  </p>
                </div>
              )}
            </FormSection>

            <FormSection
              title="Leasing info"
              isRequired
              hasData={!!watchedData.leasingInfo}
              onAdd={() => setActiveModal("leasingInfo")}
              onEdit={() => setActiveModal("leasingInfo")}
            >
              {watchedData.leasingInfo && (
                <div>
                  <p>Leasing manager:{watchedData.leasingInfo.manager}, Email:{watchedData.leasingInfo.email}</p>
                  <p>{watchedData.leasingInfo.phone}, {watchedData.leasingInfo.email}</p>
                </div>
              )}
            </FormSection>

            <FormSection
              title="Charges"
              isRequired
              hasData={!!watchedData.charges}
              onAdd={() => setActiveModal("charges")}
              onEdit={() => setActiveModal("charges")}
            >
              {watchedData.charges && (
                <div>
                  <p>Application Fee: {watchedData.charges.applicationFee}, Admin Fee: {watchedData.charges.adminFee}</p>
                </div>
              )}

            </FormSection>

            <FormSection
              title="Rent frequency & payment reminder"
              isRequired
              hasData={!!watchedData.rentFrequency}
              onAdd={() => setActiveModal("rentFrequency")}
            />

            <FormSection
              title="Application agreement"
              hasData={!!watchedData.applicationAgreement}
              onAdd={() => setActiveModal("application")}
            />

            <FormSection
              title="About the property"
              hasData={!!watchedData.aboutProperty}
              onAdd={() => setActiveModal("about")}
            />

            <FormSection
              title="Community's amenity/features"
              hasData={!!watchedData.amenities}
              onAdd={() => setActiveModal("amenities")}
            />
          </div>

          <div className="space-y-1">
            <FormSection title="Pet fees" hasData={!!watchedData.petFees} onAdd={() => setActiveModal("petFees")} />

            <FormSection title="Parking" hasData={!!watchedData.parking} onAdd={() => setActiveModal("parking")} />

            <FormSection
              title="Nearest educational institution"
              hasData={!!watchedData.educationalInstitutions}
              onAdd={() => setActiveModal("education")}
            />

            <FormSection
              title="Nearest stations"
              hasData={!!watchedData.stations}
              onAdd={() => setActiveModal("stations")}
            />

            <FormSection
              title="Nearest landmark"
              hasData={!!watchedData.landmarks}
              onAdd={() => setActiveModal("landmarks")}
            />

            <FormSection
              title="Utilities provider"
              hasData={!!watchedData.utilities}
              onAdd={() => setActiveModal("utilities")}
            />
          </div>
        </div>

        <div className="mt-12 mb-24">
          <h3 className="text-lg font-medium mb-4">Property gallery(Its not unit photo)*</h3>

          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3">Featured photos*</h4>
            <div className="grid grid-cols-6 gap-4">
              <Card className="border-2 border-dashed border-gray-300 aspect-square">
                <CardContent className="flex flex-col items-center justify-center h-full p-4">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-xs text-center text-gray-500">Upload cover photo (1st one only)</p>
                </CardContent>
              </Card>
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="border-2 border-dashed border-gray-300 aspect-square">
                  <CardContent className="flex items-center justify-center h-full">
                    <Upload className="h-6 w-6 text-gray-400" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3">More photos(optional)</h4>
            <div className="grid grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="border-2 border-dashed border-gray-300 aspect-square">
                  <CardContent className="flex items-center justify-center h-full">
                    <Upload className="h-6 w-6 text-gray-400" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Videos (optional)</span>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>


      </div>
      <div className="bg-white shadow-2xl fixed bottom-0 left-0 w-full z-10">
        {/* Progress bar at the bottom */}
        <div className="w-full h-1 bg-gray-300 mb-6">
          <div
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${(currentStep / 2) * 100}%` }}
          />
        </div>
        <div className="container flex items-center justify-between px-20 pb-4">
          <Button type="button" variant="ghost" onClick={handleBack} disabled={currentStep === 1} className="underline">
            Back
          </Button>
          <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
            {currentStep === 1 ? "Next" : "Get started"}
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {/* ! Header Section */}
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

      <div className="min-h-screen ">
        <div className="container mx-auto px-20 py-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && <PricingStep onNext={handleNext} onBack={handleBack} />}
        </div>

        <SharedModal
          isOpen={activeModal !== null}
          onClose={() => setActiveModal(null)}
          onSave={(data) => {
            if (activeModal === "propertyAddress") {
              form.setValue("propertyAddress", data as PropertyAddress)
            } else if (activeModal === "leasingInfo") {
              form.setValue("leasingInfo", data as LeasingInfo)
            } else if (activeModal === "charges") {
              form.setValue("charges", data as Charges)
            } else if (activeModal === "rentFrequency") {
              form.setValue("rentFrequency", data as RentFrequency)
            } else if (activeModal === "petFees") {
              const currentPetFees = form.getValues("petFees") || []
              form.setValue("petFees", [...currentPetFees, data as PetFee])
            } else if (activeModal === "parking") {
              form.setValue("parking", data as { type: string; description?: string })
            } else if (activeModal === "education") {
              const currentEducation = form.getValues("educationalInstitutions") || []
              form.setValue("educationalInstitutions", [...currentEducation, data as { name: string }])
            } else if (activeModal === "stations") {
              const currentStations = form.getValues("stations") || []
              form.setValue("stations", [...currentStations, data as { name: string }])
            } else if (activeModal === "landmarks") {
              const currentLandmarks = form.getValues("landmarks") || []
              form.setValue("landmarks", [...currentLandmarks, data as { name: string }])
            } else if (activeModal === "application") {
              form.setValue("applicationAgreement", data as { agreement: string; description?: string })
            } else if (activeModal === "about") {
              form.setValue("aboutProperty", data as { description: string })
            } else if (activeModal === "amenities") {
              form.setValue("amenities", data as { amenities: string })
            } else if (activeModal === "utilities") {
              form.setValue("utilities", data as { provider: string })
            }

            // Save to localStorage after each update
            saveToLocalStorage(form.getValues())
          }}
          modalType={activeModal}
          initialData={
            activeModal === "propertyAddress"
              ? watchedData.propertyAddress
              : activeModal === "leasingInfo"
                ? watchedData.leasingInfo
                : activeModal === "charges"
                  ? watchedData.charges
                  : activeModal === "rentFrequency"
                    ? watchedData.rentFrequency
                    : undefined
          }
        />
      </div>
    </div>
  )
}

export default AddressPage
