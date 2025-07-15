export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Upload & Pay',
      description: 'Submit your replay and complete payment securely',
    },
    {
      number: 2,
      title: 'Expert Review',
      description: 'Professional players analyze your gameplay',
    },
    {
      number: 3,
      title: 'Get Feedback',
      description: 'Receive detailed analysis via email',
    },
    {
      number: 4,
      title: 'Improve & Climb',
      description: 'Apply insights and dominate your games',
    },
  ]

  return (
    <div className="mt-16 text-center">
      <h3 className="text-2xl md:text-3xl font-bold mb-8">How It Works</h3>
      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div key={step.number} className="text-center">
            <div className="w-16 h-16 premium-gradient border-radius-propublic flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">
                {step.number}
              </span>
            </div>
            <h4 className="font-bold text-lg mb-2">{step.title}</h4>
            <p className="text-cream/70 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
