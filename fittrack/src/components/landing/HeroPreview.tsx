import { motion } from 'framer-motion'
import { Check, Dumbbell, Flame, Salad, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const workoutItems = [
  { name: 'Morning Run', done: true },
  { name: 'Squats × 15', done: true },
  { name: 'Push-ups × 12', done: false },
]

const macros = [
  { label: 'Protein', pct: 72, color: 'bg-primary' },
  { label: 'Carbs', pct: 58, color: 'bg-accent' },
  { label: 'Fats', pct: 45, color: 'bg-emerald-400' },
]

const weekBars = [40, 65, 55, 80, 70, 90, 60]

export function HeroPreview() {
  const { t } = useTranslation()

  return (
    <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Workouts */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="flex flex-col rounded-xl border border-border/50 bg-card/90 p-4 shadow-lg backdrop-blur"
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Dumbbell className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold">{t('hero.preview.workouts')}</span>
          </div>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
            2/3
          </span>
        </div>
        <ul className="flex-1 space-y-2">
          {workoutItems.map((item) => (
            <li
              key={item.name}
              className="flex items-center gap-2 rounded-lg bg-muted/60 px-2 py-1.5 text-xs"
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                  item.done ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                }`}
              >
                {item.done && <Check className="h-2.5 w-2.5" />}
              </span>
              <span className={item.done ? 'text-muted-foreground line-through' : 'font-medium'}>
                {item.name}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
          <Flame className="h-3.5 w-3.5 text-accent" />
          <span>340 kcal burned</span>
        </div>
      </motion.div>

      {/* Nutrition */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, delay: 0.4, repeat: Infinity }}
        className="flex flex-col rounded-xl border border-border/50 bg-card/90 p-4 shadow-lg backdrop-blur"
      >
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
            <Salad className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold">{t('hero.preview.nutrition')}</span>
        </div>
        <p className="mb-2 text-xs text-muted-foreground">{t('hero.preview.caloriesToday')}</p>
        <p className="text-2xl font-bold">
          1,840 <span className="text-sm font-normal text-muted-foreground">/ 2,200</span>
        </p>
        <div className="mt-3 space-y-2.5">
          {macros.map((m) => (
            <div key={m.label}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">{m.label}</span>
                <span className="font-semibold">{m.pct}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className={`h-full rounded-full ${m.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${m.pct}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Progress */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, delay: 0.8, repeat: Infinity }}
        className="flex flex-col rounded-xl border border-border/50 bg-card/90 p-4 shadow-lg backdrop-blur"
      >
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-500">
            <TrendingUp className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold">{t('hero.preview.progress')}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
            <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" className="stroke-muted" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                className="stroke-primary"
                strokeWidth="3"
                strokeDasharray="78 100"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-sm font-bold">78%</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{t('hero.preview.goalLabel')}</p>
            <p className="font-semibold text-sm">{t('hero.preview.goalName')}</p>
            <p className="mt-1 text-xs text-primary">+12% {t('hero.preview.thisWeek')}</p>
          </div>
        </div>
        <div className="mt-4 flex h-14 items-end justify-between gap-1">
          {weekBars.map((h, i) => (
            <motion.div
              key={i}
              className="w-full rounded-t bg-primary/70"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
            />
          ))}
        </div>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">{t('hero.preview.weekly')}</p>
      </motion.div>
    </div>
  )
}
