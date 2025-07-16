import { Lock } from 'lucide-react'

interface OrderSummaryProps {
  selectedPackage: string
}

export default function OrderSummary({ selectedPackage }: OrderSummaryProps) {
  const packageDetails = {
    basic: {
      name: 'Basic Review Package',
      description: 'Written feedback report with key moments analysis',
      price: 15,
    },
    pro: {
      name: 'Pro Review Package',
      description: '15-minute video breakdown with professional player review',
      price: 35,
    },
    elite: {
      name: 'Elite Review Package',
      description: '30-minute live coaching with top-tier coach analysis',
      price: 75,
    },
  }

  const currentPackage =
    packageDetails[selectedPackage as keyof typeof packageDetails]

  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center">
        <span className="w-8 h-8 bg-gradient-to-r from-custom-primary to-custom-secondary rounded-full flex items-center justify-center text-white font-bold mr-4 text-lg">
          4
        </span>
        Order Summary
      </h2>
      <div className="glass-effect border-radius-propublic p-6 md:p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold">{currentPackage.name}</h3>
            <p className="text-cream/70">{currentPackage.description}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold gradient-text">
              ${currentPackage.price}
            </div>
          </div>
        </div>
        <hr className="border-cream/20 mb-6" />
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Total</span>
          <span className="gradient-text">${currentPackage.price}</span>
        </div>
      </div>

      {/* Payment Button */}
      <button className="w-full premium-gradient text-white py-5 border-radius-propublic font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-3">
        <Lock className="w-6 h-6" />
        <span className="font-teko">Proceed to Secure Payment</span>
      </button>
      <p className="text-center text-sm text-cream/60 mt-4">
        🔒 Your payment is secured with 256-bit SSL encryption
      </p>
    </div>
  )
}
