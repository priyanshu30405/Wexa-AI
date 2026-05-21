import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { FITNESS_GOALS } from '@/lib/constants'
import { step3Schema, type Step3Form } from '@/lib/schemas'
import { cn } from '@/lib/utils'

interface Props {
  defaultValues?: Partial<Step3Form>
  onSubmit: (data: Step3Form) => void
}

export function Step3FitnessGoals({ defaultValues, onSubmit }: Props) {
  const { t } = useTranslation()
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step3Form>({
    resolver: zodResolver(step3Schema),
    mode: 'onChange',
    defaultValues: { goals: [], ...defaultValues },
  })

  const selected = watch('goals') ?? []

  const toggle = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter((g) => g !== id)
      : selected.length < 3
        ? [...selected, id]
        : selected
    setValue('goals', next, { shouldValidate: true })
  }

  const isValid = selected.length >= 1 && selected.length <= 3

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {FITNESS_GOALS.map((goal) => {
          const isSelected = selected.includes(goal.id)
          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => toggle(goal.id)}
              className={cn(
                'relative flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all',
                isSelected
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border bg-card hover:border-primary/40',
              )}
            >
              <span className="text-2xl">{goal.emoji}</span>
              <span className="font-semibold">{t(goal.key)}</span>
              {isSelected && (
                <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-4 w-4" />
                </span>
              )}
            </button>
          )
        })}
      </div>
      {errors.goals && <p className="text-sm text-destructive">{errors.goals.message}</p>}
      <Button type="submit" className="w-full" size="lg" disabled={!isValid}>
        {t('auth.continue')}
      </Button>
    </form>
  )
}
