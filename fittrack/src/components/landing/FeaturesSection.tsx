import { Activity, BarChart3, Salad, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const featureKeys = [
  { icon: Activity, titleKey: 'features.workout.title', descKey: 'features.workout.desc' },
  { icon: Salad, titleKey: 'features.nutrition.title', descKey: 'features.nutrition.desc' },
  { icon: BarChart3, titleKey: 'features.analytics.title', descKey: 'features.analytics.desc' },
  { icon: Users, titleKey: 'features.community.title', descKey: 'features.community.desc' },
]

export function FeaturesSection() {
  const { t } = useTranslation()

  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('features.title')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('features.subtitle')}</p>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featureKeys.map((feature, i) => (
            <ScrollReveal key={feature.titleKey} delay={i * 0.1}>
              <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{t(feature.titleKey)}</CardTitle>
                  <CardDescription>{t(feature.descKey)}</CardDescription>
                </CardHeader>
                <CardContent />
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
