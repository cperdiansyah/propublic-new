'use client'

// React & Next.js
import Image from 'next/image'

// Shared modules
import { CheckCircleIcon, ShieldCheckIcon, LockIcon } from 'lucide-react'

export const ResetPasswordSidebar: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-primary/10">
            <ShieldCheckIcon className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Reset Your Password
          </h1>
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed">
          Create a new secure password for your ProPublic account. Your password
          should be strong and unique.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start space-x-3">
          <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-foreground">Secure Password</h3>
            <p className="text-sm text-muted-foreground">
              Use at least 8 characters with uppercase, lowercase, numbers, and
              special characters
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <LockIcon className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-foreground">Encrypted Storage</h3>
            <p className="text-sm text-muted-foreground">
              Your password is encrypted and stored securely using industry
              standards
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <CheckCircleIcon className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-foreground">Instant Access</h3>
            <p className="text-sm text-muted-foreground">
              Once reset, you'll be able to log in immediately with your new
              password
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-xl"></div>
        <div className="relative p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-4">
            <Image
              src="/logo.svg"
              alt="ProPublic"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <div>
              <h3 className="font-semibold text-foreground">
                ProPublic Security
              </h3>
              <p className="text-sm text-muted-foreground">
                Protecting your gaming progress
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
