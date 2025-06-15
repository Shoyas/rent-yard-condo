"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard } from "lucide-react"

interface PricingStepProps {
  onNext: () => void
  onBack: () => void
}

export function PricingStep({ onNext, onBack }: PricingStepProps) {
  return (
    <div className="min-h-screen space-y-8">
      <div className="container mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Chose a plan for after 30-days free trial</h2>

          <div className="flex gap-2 mb-6">
            <Button variant="default" size="sm" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
              Monthly
            </Button>
            <Button variant="ghost" size="sm">
              Annually (save 57%)
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="border-2 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Regular</h3>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Auto Pay
                  </Badge>
                </div>
                <div className="mb-2">
                  <span className="text-3xl font-bold">$99.99</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <p className="text-sm text-gray-600">Price for 1-50 unit</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Platinum</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold">$129.99</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <p className="text-sm text-gray-600">Price for 1-50 unit</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Enterprise</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold">$199.99</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <p className="text-sm text-gray-600">Price for 1-50 unit</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Payment option</h3>
            <Button variant="link" className="text-blue-600">
              Add new card
            </Button>
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <span className="text-sm">Alex jones(Amex card) ••••••8565</span>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Select
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white shadow-2xl fixed bottom-0 left-0 w-full z-10">
        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-300 mb-6">
          <div className="h-full bg-black w-full" />
        </div>

        <div className="container flex items-center justify-between px-20 pb-4">
          <Button type="button" variant="ghost" onClick={onBack} className="underline">
            Back
          </Button>
          <div className="flex items-center gap-4">
            <span className="text-sm">
              Total with card charge: <strong>$970</strong>
            </span>
            <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700">
              Pay & add property
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
