import { useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Upload } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { step5Schema, type Step5Form } from '@/lib/schemas'
import { cn } from '@/lib/utils'

interface Props {
  defaultValues?: Partial<Step5Form>
  avatarUrl?: string
  onAvatarChange: (url: string) => void
  onSubmit: (data: Step5Form) => void
  onSkip: () => void
}

export function Step5ProfileSetup({
  defaultValues,
  avatarUrl,
  onAvatarChange,
  onSubmit,
  onSkip,
}: Props) {
  const { t } = useTranslation()
  const fileRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<Step5Form>({
    resolver: zodResolver(step5Schema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      bio: '',
      workoutReminders: true,
      mealTips: true,
      weeklyReport: false,
      ...defaultValues,
    },
  })

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => onAvatarChange(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          const file = e.dataTransfer.files[0]
          if (file?.type.startsWith('image/')) handleFile(file)
        }}
        className={cn(
          'flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed p-8 transition-colors',
          dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
        )}
      >
        <Avatar className="h-24 w-24">
          {avatarUrl && <AvatarImage src={avatarUrl} alt="Profile" />}
          <AvatarFallback className="text-2xl">
            <Upload className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>
        <p className="text-center text-sm text-muted-foreground">{t('auth.step5.avatar')}</p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />
      </div>

      <div>
        <Label htmlFor="username">{t('auth.step5.username')}</Label>
        <Input id="username" className="mt-1.5" error={!!errors.username} {...register('username')} />
        {errors.username && <p className="mt-1 text-sm text-destructive">{errors.username.message}</p>}
      </div>

      <div>
        <Label htmlFor="bio">{t('auth.step5.bio')}</Label>
        <textarea
          id="bio"
          className="mt-1.5 flex min-h-[80px] w-full rounded-xl border border-input bg-card px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register('bio')}
        />
      </div>

      <div className="space-y-4 rounded-xl bg-muted/40 p-4">
        <p className="font-medium">{t('auth.step5.notifications')}</p>
        {(
          [
            ['workoutReminders', t('auth.step5.workoutReminders')],
            ['mealTips', t('auth.step5.mealTips')],
            ['weeklyReport', t('auth.step5.weeklyReport')],
          ] as const
        ).map(([name, label]) => (
          <div key={name} className="flex items-center justify-between">
            <Label htmlFor={name}>{label}</Label>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <Switch id={name} checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
          </div>
        ))}
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={!isValid}>
        {t('auth.continue')}
      </Button>
      <button type="button" onClick={onSkip} className="w-full text-center text-sm text-muted-foreground hover:text-primary">
        {t('auth.skip')}
      </button>
    </form>
  )
}
