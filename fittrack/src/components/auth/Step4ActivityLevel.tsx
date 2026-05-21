import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Armchair, Bike, Dumbbell, Flame, Trophy } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { ACTIVITY_LEVELS } from '@/lib/constants'
import { step4Schema, type Step4Form } from '@/lib/schemas'
import { cn } from '@/lib/utils'

const icons = [Armchair, Bike, Dumbbell, Flame, Trophy]

interface Props {
  defaultValues?: Partial<Step4Form>
  onSubmit: (data: Step4Form) => void
  onSkip: () => void
}

export function Step4ActivityLevel({ defaultValues, onSubmit, onSkip }: Props) {
  const { t } = useTranslation()
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step4Form>({
    resolver: zodResolver(step4Schema),
    mode: 'onChange',
    defaultValues: { activityLevel: '', ...defaultValues },
  })

  const selected = watch('activityLevel')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-3">
        {ACTIVITY_LEVELS.map((level, i) => {
          const Icon = icons[i]
          const isSelected = selected === level.id
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => setValue('activityLevel', level.id, { shouldValidate: true })}
              className={cn(
                'flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all',
                isSelected ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/30',
              )}
            >
              <div
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                )}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">{t(level.key)}</p>
                <p className="text-sm text-muted-foreground">{t(level.descKey)}</p>
              </div>
              <div
                className={cn(
                  'ml-auto h-5 w-5 shrink-0 rounded-full border-2',
                  isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/40',
                )}
              >
                {isSelected && <div className="m-1 h-2.5 w-2.5 rounded-full bg-white" />}
              </div>
            </button>
          )
        })}
      </div>
      {errors.activityLevel && (
        <p className="text-sm text-destructive">{errors.activityLevel.message}</p>
      )}
      <Button type="submit" className="w-full" size="lg" disabled={!selected}>
        {t('auth.continue')}
      </Button>
      <button type="button" onClick={onSkip} className="w-full text-center text-sm text-muted-foreground hover:text-primary">
        {t('auth.skip')}
      </button>
    </form>
  )
}
