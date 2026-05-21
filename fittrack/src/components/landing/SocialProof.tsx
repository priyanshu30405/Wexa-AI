import { useTranslation } from 'react-i18next'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const brands = ['Nike', 'Adidas', 'Under Armour', 'Peloton', 'WHOOP', 'Strava']

export function SocialProof() {
  const { t } = useTranslation()

  return (
    <section className="border-y border-border/60 bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {t('social.title')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {brands.map((brand) => (
              <span
                key={brand}
                className="text-xl font-bold tracking-tight text-muted-foreground/60 transition-colors hover:text-foreground sm:text-2xl"
              >
                {brand}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
