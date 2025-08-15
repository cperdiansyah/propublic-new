'use client'

// React & Next.js
import Link from 'next/link'

// External libraries
import { Mail, ArrowLeft, Shield, Clock, CheckCircle } from 'lucide-react'

// Shared modules
import BackgroundEffects from '@shared/components/effects/grid-glow'
import ROUTE from '@shared/config/pages'

/**
 * Email Sent Success Component
 * Success page shown after email is sent
 * Following Single Responsibility Principle
 */
interface EmailSentSuccessProps {
  email: string
  isResending: boolean
  onResendEmail: () => Promise<void>
}

export const EmailSentSuccess = ({
  email,
  isResending,
  onResendEmail,
}: EmailSentSuccessProps) => (
  <div className="min-h-screen relative flex items-center justify-center px-4 py-12">
    <BackgroundEffects className="overflow-hidden" />

    <div className="max-w-md mx-auto w-full relative">
      <div className="enhanced-card border-radius-propublic p-8 md:p-10 text-center">
        <SuccessIcon />
        <SuccessHeader email={email} />
        <Instructions />
        <ExpiryNotice />
        <ActionButtons
          isResending={isResending}
          onResendEmail={onResendEmail}
        />
        <HelpText />
      </div>
    </div>
  </div>
)

/**
 * Success Icon Component
 * Animated success checkmark
 */
const SuccessIcon = () => (
  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-fadeIn">
    <CheckCircle className="w-10 h-10 text-green-400" />
  </div>
)

/**
 * Success Header Component
 * Title and email confirmation message
 */
interface SuccessHeaderProps {
  email: string
}

const SuccessHeader = ({ email }: SuccessHeaderProps) => (
  <>
    <h2 className="text-3xl font-bold mb-4">Check Your Email</h2>
    <p className="text-cream/70 mb-6 leading-relaxed">
      We've sent a password reset link to{' '}
      <span className="text-custom-accent font-semibold">{email}</span>
    </p>
  </>
)

/**
 * Instructions Component
 * Step-by-step instructions for the user
 */
const Instructions = () => (
  <div className="bg-dark-primary/50 border-radius-propublic p-6 mb-8 text-left">
    <h3 className="font-bold text-lg mb-4 flex items-center">
      <Shield className="w-5 h-5 text-custom-accent mr-2" />
      Next Steps:
    </h3>
    <ol className="space-y-3 text-cream/80">
      <InstructionStep
        step={1}
        text="Check your email inbox (and spam folder)"
      />
      <InstructionStep step={2} text="Click the 'Reset Password' link" />
      <InstructionStep step={3} text="Create your new password" />
    </ol>
  </div>
)

/**
 * Instruction Step Component
 * Individual instruction step
 */
interface InstructionStepProps {
  step: number
  text: string
}

const InstructionStep = ({ step, text }: InstructionStepProps) => (
  <li className="flex items-start space-x-3">
    <span className="w-6 h-6 bg-custom-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
      {step}
    </span>
    <span>{text}</span>
  </li>
)

/**
 * Expiry Notice Component
 * Information about link expiration
 */
const ExpiryNotice = () => (
  <div className="bg-custom-accent/10 border border-custom-accent/20 border-radius-propublic p-4 mb-6">
    <div className="flex items-center justify-center space-x-2 text-custom-accent mb-2">
      <Clock className="w-4 h-4" />
      <span className="text-sm font-medium">Link expires in 15 minutes</span>
    </div>
    <p className="text-cream/60 text-xs">
      Didn't receive the email? Check your spam folder or request a new one.
    </p>
  </div>
)

/**
 * Action Buttons Component
 * Resend and back to login buttons
 */
interface ActionButtonsProps {
  isResending: boolean
  onResendEmail: () => Promise<void>
}

const ActionButtons = ({ isResending, onResendEmail }: ActionButtonsProps) => (
  <div className="space-y-4">
    <ResendButton isResending={isResending} onResendEmail={onResendEmail} />

    <Link
      href={ROUTE.PUBLIC.AUTH.LOGIN}
      className="w-full bg-gradient-to-r from-custom-primary to-custom-secondary text-cream py-3 border-radius-propublic font-semibold hover:shadow-lg transition-all glow flex items-center justify-center space-x-2"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back to Login</span>
    </Link>
  </div>
)

/**
 * Resend Button Component
 * Button to resend the email
 */
interface ResendButtonProps {
  isResending: boolean
  onResendEmail: () => Promise<void>
}

const ResendButton = ({ isResending, onResendEmail }: ResendButtonProps) => (
  <button
    onClick={onResendEmail}
    disabled={isResending}
    className="w-full border border-custom-accent hover:bg-custom-accent hover:text-dark-primary text-custom-accent py-3 border-radius-propublic font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
  >
    {isResending ? (
      <>
        <div className="w-4 h-4 border-2 border-custom-accent/30 border-t-custom-accent rounded-full animate-spin"></div>
        <span>Sending...</span>
      </>
    ) : (
      <>
        <Mail className="w-4 h-4" />
        <span>Resend Email</span>
      </>
    )}
  </button>
)

/**
 * Help Text Component
 * Support contact information
 */
const HelpText = () => (
  <div className="mt-8 pt-6 border-t border-cream/10">
    <p className="text-cream/60 text-sm">
      Still having trouble?{' '}
      <Link
        href="/support"
        className="text-custom-accent hover:text-custom-accent/80 underline"
      >
        Contact Support
      </Link>
    </p>
  </div>
)
