import { useState } from 'react'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MOCK_WORKOUTS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function TodayWorkout() {
  const { t } = useTranslation()
  const [exercises, setExercises] = useState(MOCK_WORKOUTS)

  const toggle = (id: string) => {
    setExercises((prev) =>
      prev.map((e) => (e.id === id ? { ...e, done: !e.done } : e)),
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t('dashboard.todayWorkout')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {exercises.map((ex) => (
          <button
            key={ex.id}
            type="button"
            onClick={() => toggle(ex.id)}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all',
              ex.done ? 'border-primary/30 bg-primary/5' : 'border-border hover:border-primary/30',
            )}
          >
            <span
              className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors',
                ex.done ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/40',
              )}
            >
              {ex.done && <Check className="h-4 w-4" />}
            </span>
            <span className={cn('font-medium', ex.done && 'text-muted-foreground line-through')}>
              {ex.name}
            </span>
          </button>
        ))}
      </CardContent>
    </Card>
  )
}
