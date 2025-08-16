'use client'

import { useState } from 'react'

import CustomerInfo from '@/features/replay/components/customer-info'
import FileUpload from '@/features/replay/components/file-upload'
import HowItWorks from '@/features/replay/components/how-it-works'
import OrderSummary from '@/features/replay/components/order-summary'
import PackageSelection from '@/features/replay/components/package-selection'

export default function ReplayContent() {
  const [selectedPackage, setSelectedPackage] = useState('pro')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Replay Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            Professional <span className="gradient-text">Replay Analysis</span>
          </h1>
          <p className="text-xl md:text-2xl text-cream/80 max-w-3xl mx-auto leading-relaxed">
            Get your gameplay reviewed by professional players and coaches.
            Upload your replay, choose your package, and receive detailed
            feedback to improve your performance.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="enhanced-card border-radius-propublic p-8 md:p-12">
          {/* Step 1: Upload Replay */}

          {/* Step 2: Choose Package */}
          <PackageSelection
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
            order={1}
          />

          {/* Step 3: Customer Information */}
          <CustomerInfo order={2} />

          {/* Step 4: Order Summary & Payment */}
          <OrderSummary selectedPackage={selectedPackage} order={3} />
        </div>

        {/* How It Works */}
        <HowItWorks />
      </div>
    </div>
  )
}
