import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Progress } from '@/components/ui/progress'

interface StepIndicatorProps {
  current: number
  total?: number
}

export function StepIndicator({ current, total = 5 }: StepIndicatorProps) {
  const { t } = useTranslation()
  const progress = (current / total) * 100

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-muted-foreground">
          {t('auth.step', { current, total })}
        </span>
        <span className="font-semibold text-primary">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
      <motion.div
        className="mt-3 flex justify-between gap-1"
        initial={false}
      >
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i < current ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </motion.div>
    </div>
  )
}
