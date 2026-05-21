import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { cn } from '@/lib/utils'

const tiers = [
  {
    key: 'free',
    features: ['Basic workout tracking', '3 meal plans', 'Community access', 'Mobile app'],
    highlighted: false,
  },
  {
    key: 'pro',
    features: ['Everything in Free', 'Unlimited workouts', 'Advanced analytics', 'Custom meal plans', 'Priority support'],
    highlighted: true,
  },
  {
    key: 'elite',
    features: ['Everything in Pro', '1-on-1 coaching', 'Wearable sync', 'API access', 'White-glove onboarding'],
    highlighted: false,
  },
]

export function PricingSection() {
  const { t } = useTranslation()

  return (
    <section id="pricing" className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('pricing.title')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('pricing.subtitle')}</p>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier, i) => {
            const name = t(`pricing.${tier.key}.name`)
            const price = t(`pricing.${tier.key}.price`)
            const period = t(`pricing.${tier.key}.period`)
            const cta = t(`pricing.${tier.key}.cta`)

            return (
              <ScrollReveal key={tier.key} delay={i * 0.1}>
                <Card
                  className={cn(
                    'relative h-full transition-all hover:shadow-xl',
                    tier.highlighted && 'border-primary shadow-lg shadow-primary/10 scale-[1.02] lg:scale-105',
                  )}
                >
                  {tier.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                      {t('pricing.popular')}
                    </span>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-extrabold">{price}</span>
                      <span className="text-muted-foreground">{period}</span>
                    </div>
                    <CardDescription className="sr-only">{name} plan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link to="/auth" className="mt-8 block">
                      <Button
                        className="w-full"
                        variant={tier.highlighted ? 'default' : 'outline'}
                      >
                        {cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
