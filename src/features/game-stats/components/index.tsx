'use client'

import CustomerInfo from './customer-info'
import FileUpload from './file-upload'
import HowItWorks from './how-it-works'
import OrderSummary from './order-summary'
import PackageSelection from './package-selection'
import { useState } from 'react'

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
          <FileUpload
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
          />

          {/* Step 2: Choose Package */}
          <PackageSelection
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
          />

          {/* Step 3: Customer Information */}
          <CustomerInfo />

          {/* Step 4: Order Summary & Payment */}
          <OrderSummary selectedPackage={selectedPackage} />
        </div>

        {/* How It Works */}
        <HowItWorks />
      </div>
    </div>
  )
}
