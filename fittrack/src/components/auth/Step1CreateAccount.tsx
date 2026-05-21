import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { GoogleSignInButton, type GoogleUserData } from '@/components/auth/GoogleSignInButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { step1Schema, type Step1Form } from '@/lib/schemas'
import { getPasswordStrength } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Props {
  defaultValues?: Partial<Step1Form>
  onSubmit: (data: Step1Form) => void
  onGoogleSignIn: (data: GoogleUserData) => void
}

export function Step1CreateAccount({ defaultValues, onSubmit, onGoogleSignIn }: Props) {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Step1Form>({
    resolver: zodResolver(step1Schema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      ...defaultValues,
    },
  })

  const password = watch('password') ?? ''
  const strength = getPasswordStrength(password)

  const strengthColors: Record<string, string> = {
    weak: 'bg-destructive',
    fair: 'bg-accent',
    good: 'bg-primary/70',
    strong: 'bg-primary',
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label htmlFor="fullName">{t('auth.step1.fullName')}</Label>
        <Input id="fullName" className="mt-1.5" error={!!errors.fullName} {...register('fullName')} />
        {errors.fullName && (
          <p className="mt-1 text-sm text-destructive" role="alert">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">{t('auth.step1.email')}</Label>
        <Input id="email" type="email" className="mt-1.5" error={!!errors.email} {...register('email')} />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive" role="alert">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">{t('auth.step1.password')}</Label>
        <Input id="password" type="password" className="mt-1.5" error={!!errors.password} {...register('password')} />
        {password && (
          <div className="mt-2">
            <div className="flex h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className={cn('h-full transition-all duration-300', strengthColors[strength.label])}
                style={{ width: `${strength.score}%` }}
              />
            </div>
            <p className="mt-1 text-xs capitalize text-muted-foreground">{strength.label}</p>
          </div>
        )}
        {errors.password && (
          <p className="mt-1 text-sm text-destructive" role="alert">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword">{t('auth.step1.confirmPassword')}</Label>
        <Input
          id="confirmPassword"
          type="password"
          className="mt-1.5"
          error={!!errors.confirmPassword}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-destructive" role="alert">{errors.confirmPassword.message}</p>
        )}
      </div>

      <GoogleSignInButton onSuccess={onGoogleSignIn} />

      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">{t('auth.or')}</span>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={!isValid}>
        {t('auth.continue')}
      </Button>
    </form>
  )
}
