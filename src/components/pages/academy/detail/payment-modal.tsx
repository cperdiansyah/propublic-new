'use client'

import { useState } from 'react'
import type { ICourseItem } from '@/types/home.types'
import type {
  PaymentMethod,
  PaymentFormData,
} from '@/types/academy-detail.types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import {
  Shield,
  CreditCard,
  Smartphone,
  Building2,
  Check,
  Lock,
} from 'lucide-react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  course: ICourseItem
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    type: 'card',
    name: 'Credit/Debit Card',
    icon: '💳',
    isPopular: true,
  },
  {
    id: 'gopay',
    type: 'ewallet',
    name: 'GoPay',
    icon: '🟢',
  },
  {
    id: 'ovo',
    type: 'ewallet',
    name: 'OVO',
    icon: '🟣',
  },
  {
    id: 'dana',
    type: 'ewallet',
    name: 'DANA',
    icon: '🔵',
  },
  {
    id: 'bca',
    type: 'bank',
    name: 'BCA Virtual Account',
    icon: '🏦',
  },
  {
    id: 'mandiri',
    type: 'bank',
    name: 'Mandiri Virtual Account',
    icon: '🏦',
  },
]

export default function PaymentModal({
  isOpen,
  onClose,
  course,
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('card')
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    if (!agreeToTerms) return

    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In real app, handle payment here
    console.log('Processing payment for:', course.course_title)
    setIsProcessing(false)
    onClose()
    // Show success message or redirect
  }

  const price = Number(course.course_price)
  const tax = price * 0.11 // 11% tax
  const total = price + tax

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[95vw] sm:w-full bg-dark-secondary border border-custom-primary/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold">
            Complete Your Purchase
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
          {/* Course Summary */}
          <div className="bg-dark-primary/50 border-radius-propublic p-3 sm:p-4 border border-cream/10">
            <div className="flex gap-3 sm:gap-4">
              <img
                src={course.course_image_url}
                alt={course.course_title}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="font-bold text-base sm:text-lg">
                  {course.course_title}
                </h3>
                <p className="text-cream/60 text-xs sm:text-sm">
                  Lifetime Access • Certificate Included
                </p>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between">
              <span className="text-cream/80">Course Price</span>
              <span className="font-semibold">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                }).format(price)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-cream/80">Tax (11%)</span>
              <span className="font-semibold">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                }).format(tax)}
              </span>
            </div>
            <div className="border-t border-cream/20 pt-3">
              <div className="flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold gradient-text">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                  }).format(total)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
              Select Payment Method
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-3 sm:p-4 border-radius-propublic border-2 transition-all ${
                    selectedMethod === method.id
                      ? 'border-custom-primary bg-custom-primary/10'
                      : 'border-cream/20 hover:border-cream/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{method.icon}</span>
                    <div className="text-left flex-1">
                      <div className="font-semibold flex items-center gap-2">
                        {method.name}
                        {method.isPopular && (
                          <span className="text-xs bg-custom-accent text-dark-primary px-2 py-0.5 rounded">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>
                    {selectedMethod === method.id && (
                      <Check className="w-5 h-5 text-custom-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-cream/30 bg-dark-secondary text-custom-primary focus:ring-custom-primary"
              />
              <span className="text-sm text-cream/80">
                I agree to the Terms of Service and understand that this
                purchase is non-refundable after 30 days. I will receive
                immediate access to the course content.
              </span>
            </label>
          </div>

          {/* Security Notice */}
          <div className="bg-custom-accent/10 border border-custom-accent/20 border-radius-propublic p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-custom-accent mt-0.5" />
              <div>
                <h4 className="font-semibold text-custom-accent mb-1">
                  Secure Payment
                </h4>
                <p className="text-cream/70 text-sm">
                  Your payment information is encrypted and secure. We never
                  store your card details.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={onClose}
              className="flex-1 border border-cream/30 text-cream py-2.5 sm:py-3 border-radius-propublic font-semibold text-sm sm:text-base hover:bg-cream/10 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={!agreeToTerms || isProcessing}
              className="flex-1 premium-gradient text-white py-2.5 sm:py-3 border-radius-propublic font-bold text-sm sm:text-base hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Complete Purchase</span>
                </>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
