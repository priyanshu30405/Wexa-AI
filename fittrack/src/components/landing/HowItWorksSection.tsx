import { ArrowRight, Target, TrendingUp, UserPlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const steps = [
  { icon: UserPlus, titleKey: 'howItWorks.step1.title', descKey: 'howItWorks.step1.desc' },
  { icon: Target, titleKey: 'howItWorks.step2.title', descKey: 'howItWorks.step2.desc' },
  { icon: TrendingUp, titleKey: 'howItWorks.step3.title', descKey: 'howItWorks.step3.desc' },
]

export function HowItWorksSection() {
  const { t } = useTranslation()

  return (
    <section id="how-it-works" className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('howItWorks.title')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('howItWorks.subtitle')}</p>
        </ScrollReveal>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent lg:block" />
          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step, i) => (
              <ScrollReveal key={step.titleKey} delay={i * 0.15} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                    <step.icon className="h-8 w-8" />
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{t(step.titleKey)}</h3>
                  <p className="mt-2 max-w-xs text-muted-foreground">{t(step.descKey)}</p>
                  {i < steps.length - 1 && (
                    <ArrowRight className="mt-6 h-6 w-6 rotate-90 text-primary/50 lg:hidden" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
