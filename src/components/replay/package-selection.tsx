'use client'

import { Check } from 'lucide-react'

interface PackageSelectionProps {
  selectedPackage: string
  setSelectedPackage: (pkg: string) => void
}

export default function PackageSelection({
  selectedPackage,
  setSelectedPackage,
}: PackageSelectionProps) {
  const packages = [
    {
      id: 'basic',
      name: 'Basic Review',
      price: 15,
      description: 'Perfect for getting started',
      features: [
        'Written feedback report',
        'Key moments analysis',
        '3-5 day delivery',
      ],
    },
    {
      id: 'pro',
      name: 'Pro Review',
      price: 35,
      description: 'Most comprehensive',
      features: [
        'Everything in Basic',
        '15-minute video breakdown',
        'Professional player review',
        '24-48 hour delivery',
      ],
      popular: true,
    },
    {
      id: 'elite',
      name: 'Elite Review',
      price: 75,
      description: 'For serious competitors',
      features: [
        'Everything in Pro',
        '30-minute live coaching',
        'Top-tier coach analysis',
        '24 hour priority delivery',
      ],
    },
  ]

  return (
    <div className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center">
        <span className="w-8 h-8 bg-gradient-to-r from-custom-primary to-custom-secondary rounded-full flex items-center justify-center text-white font-bold mr-4 text-lg">
          2
        </span>
        Choose Your Analysis Package
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => setSelectedPackage(pkg.id)}
            className={`pricing-card enhanced-card rounded-2xl p-6 cursor-pointer border-2 transition-all duration-300 relative ${
              selectedPackage === pkg.id
                ? 'border-custom-primary'
                : 'hover:border-accent'
            } ${pkg.popular ? 'border-custom-primary' : ''}`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="premium-gradient text-white px-4 py-1 rounded-full text-xs font-bold">
                  POPULAR
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
              <div className="text-3xl font-black mb-3">
                <span className="gradient-text">${pkg.price}</span>
              </div>
              <p className="text-cream/60">{pkg.description}</p>
            </div>

            <ul className="space-y-3 mb-6 text-sm">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="text-center">
              <div
                className={`w-6 h-6 border-2 rounded-full mx-auto flex items-center justify-center ${
                  selectedPackage === pkg.id
                    ? 'border-custom-primary bg-custom-primary'
                    : 'border-cream/30'
                }`}
              >
                {selectedPackage === pkg.id && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
