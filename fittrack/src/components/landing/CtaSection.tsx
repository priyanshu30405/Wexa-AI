import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export function CtaSection() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-emerald-600 to-teal-700 px-6 py-16 text-center text-white shadow-2xl shadow-primary/30 sm:px-12"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
            <h2 className="relative text-3xl font-bold sm:text-4xl">{t('cta.title')}</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/90">{t('cta.subtitle')}</p>
            <form
              className="relative mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder={t('cta.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-0 bg-white/95 text-foreground placeholder:text-muted-foreground"
                aria-label={t('cta.placeholder')}
              />
              <Link to="/auth">
                <Button variant="accent" size="lg" className="h-12 w-full sm:w-auto">
                  {t('cta.button')}
                </Button>
              </Link>
            </form>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
