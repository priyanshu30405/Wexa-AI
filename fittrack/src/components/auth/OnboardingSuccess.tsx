import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PartyPopper } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

export function OnboardingSuccess() {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center py-8 text-center"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.6, repeat: 2 }}
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary"
      >
        <PartyPopper className="h-10 w-10" />
      </motion.div>
      <h2 className="text-2xl font-bold">{t('auth.success.title')}</h2>
      <p className="mt-2 max-w-sm text-muted-foreground">{t('auth.success.subtitle')}</p>
      <Link to="/dashboard" className="mt-8 w-full max-w-xs">
        <Button size="lg" className="w-full">
          {t('auth.success.cta')}
        </Button>
      </Link>
    </motion.div>
  )
}
