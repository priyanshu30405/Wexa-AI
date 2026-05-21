import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Card } from '@/components/ui/card'
import { step2Schema, type Step2Form } from '@/lib/schemas'
import { cn } from '@/lib/utils'

interface Props {
  defaultValues?: Partial<Step2Form>
  onSubmit: (data: Step2Form) => void
}

export function Step2PersonalDetails({ defaultValues, onSubmit }: Props) {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<Step2Form>({
    resolver: zodResolver(step2Schema),
    mode: 'onChange',
    defaultValues: {
      dob: '',
      gender: undefined,
      height: 170,
      weight: 70,
      weightUnit: 'kg',
      ...defaultValues,
    },
  })

  const gender = watch('gender')
  const weightUnit = watch('weightUnit')
  const height = watch('height')
  const weight = watch('weight')

  const genders = [
    { value: 'male' as const, label: t('auth.step2.male') },
    { value: 'female' as const, label: t('auth.step2.female') },
    { value: 'other' as const, label: t('auth.step2.other') },
  ]

  return (
    <Card className="border-0 bg-muted/30 p-6 shadow-none sm:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="dob">{t('auth.step2.dob')}</Label>
          <Input id="dob" type="date" className="mt-1.5" error={!!errors.dob} {...register('dob')} />
          {errors.dob && <p className="mt-1 text-sm text-destructive">{errors.dob.message}</p>}
        </div>

        <div>
          <Label>{t('auth.step2.gender')}</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {genders.map((g) => (
              <button
                key={g.value}
                type="button"
                onClick={() => setValue('gender', g.value, { shouldValidate: true })}
                className={cn(
                  'rounded-full border px-5 py-2.5 text-sm font-medium transition-all',
                  gender === g.value
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card hover:border-primary/50',
                )}
              >
                {g.label}
              </button>
            ))}
          </div>
          {errors.gender && <p className="mt-1 text-sm text-destructive">{errors.gender.message}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label>{t('auth.step2.height')}</Label>
            <span className="text-sm font-semibold">{height} cm</span>
          </div>
          <Controller
            name="height"
            control={control}
            render={({ field }) => (
              <Slider
                className="mt-3"
                min={120}
                max={220}
                step={1}
                value={[field.value]}
                onValueChange={([v]) => field.onChange(v)}
              />
            )}
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label>{t('auth.step2.weight')}</Label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setValue('weightUnit', 'kg', { shouldValidate: true })}
                className={cn(
                  'rounded-lg px-2 py-1 text-xs font-semibold',
                  weightUnit === 'kg' ? 'bg-primary text-primary-foreground' : 'bg-muted',
                )}
              >
                kg
              </button>
              <button
                type="button"
                onClick={() => setValue('weightUnit', 'lbs', { shouldValidate: true })}
                className={cn(
                  'rounded-lg px-2 py-1 text-xs font-semibold',
                  weightUnit === 'lbs' ? 'bg-primary text-primary-foreground' : 'bg-muted',
                )}
              >
                lbs
              </button>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-4">
            <Controller
              name="weight"
              control={control}
              render={({ field }) => (
                <Slider
                  className="flex-1"
                  min={weightUnit === 'kg' ? 40 : 88}
                  max={weightUnit === 'kg' ? 150 : 330}
                  step={1}
                  value={[field.value]}
                  onValueChange={([v]) => field.onChange(v)}
                />
              )}
            />
            <Input
              type="number"
              className="w-20"
              value={weight}
              onChange={(e) => setValue('weight', Number(e.target.value), { shouldValidate: true })}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={!isValid}>
          {t('auth.continue')}
        </Button>
      </form>
    </Card>
  )
}
