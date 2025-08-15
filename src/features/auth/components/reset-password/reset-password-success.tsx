'use client'

// React & Next.js
import { CheckCircleIcon } from 'lucide-react'

// Shared modules
import { Button } from '@shared/components/ui/button'
import { Card, CardContent, CardHeader } from '@shared/components/ui/card'
import BackgroundEffects from '@shared/components/effects/grid-glow'

interface ResetPasswordSuccessProps {
  onBackToLogin: () => void
}

export const ResetPasswordSuccess: React.FC<ResetPasswordSuccessProps> = ({
  onBackToLogin,
}) => {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12 mt-14">
      <BackgroundEffects className="overflow-hidden" />

      <div className="max-w-md mx-auto w-full relative">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm text-center">
          <CardHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-green-500/10">
                <CheckCircleIcon className="w-12 h-12 text-green-500" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                Password Reset Successful!
              </h1>
              <p className="text-muted-foreground">
                Your password has been successfully updated. You can now log in
                with your new password.
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button onClick={onBackToLogin} className="w-full" size="lg">
              Continue to Login
            </Button>

            <p className="text-sm text-muted-foreground">
              Ready to get back to gaming? Log in and continue your journey.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
