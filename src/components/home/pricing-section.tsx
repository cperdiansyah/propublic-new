import { Check } from 'lucide-react'

export default function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for getting started',
      features: ['Access to all communities', 'Basic guides library'],
      buttonText: 'Get Started Free',
      buttonStyle:
        'border border-accent hover:bg-accent hover:text-dark-primary text-accent',
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/month',
      description: 'For serious improvement',
      features: ['Everything in Starter', '3 coaching sessions/month'],
      buttonText: 'Start 7-Day Free Trial',
      buttonStyle: 'bg-gradient-to-r from-primary to-secondary text-cream glow',
      featured: true,
    },
    {
      name: 'Elite',
      price: '$49',
      period: '/month',
      description: 'For aspiring pros',
      features: ['Everything in Pro', 'Unlimited coaching sessions'],
      buttonText: 'Contact Sales',
      buttonStyle:
        'border border-accent hover:bg-accent hover:text-dark-primary text-accent',
    },
  ]

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose your <span className="gradient-text">game plan</span>
          </h2>
          <p className="text-xl text-cream/70 max-w-3xl mx-auto">
            Whether you're just starting out or aiming for pro level, we have
            the perfect plan for your gaming journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card rounded-3xl p-8 ${plan.featured ? 'featured relative' : ''}`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-secondary text-cream px-4 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-black mb-4">
                  <span className="gradient-text">{plan.price}</span>
                  {plan.period && (
                    <span className="text-lg text-cream/60 font-normal">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-cream/60">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center space-x-3"
                  >
                    <Check className="w-5 h-5 text-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all hover:shadow-lg ${plan.buttonStyle}`}
                type="button"
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
