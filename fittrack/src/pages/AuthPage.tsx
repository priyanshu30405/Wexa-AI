import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Dumbbell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StepIndicator } from '@/components/auth/StepIndicator'
import { Step1CreateAccount } from '@/components/auth/Step1CreateAccount'
import { Step2PersonalDetails } from '@/components/auth/Step2PersonalDetails'
import { Step3FitnessGoals } from '@/components/auth/Step3FitnessGoals'
import { Step4ActivityLevel } from '@/components/auth/Step4ActivityLevel'
import { Step5ProfileSetup } from '@/components/auth/Step5ProfileSetup'
import { OnboardingSuccess } from '@/components/auth/OnboardingSuccess'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'
import { useOnboardingStore } from '@/store/onboardingStore'
import { useAuthStore } from '@/store/authStore'
import type { Step1Form, Step2Form, Step3Form, Step4Form, Step5Form } from '@/lib/schemas'

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 80 : -80, opacity: 0 }),
}

export function AuthPage() {
  const { t } = useTranslation()
  const { step, nextStep, prevStep, setStep } = useOnboardingStore()
  const { user, setUser, updateUser } = useAuthStore()
  const [direction, setDirection] = useState(1)
  const [complete, setComplete] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? '')

  const titles: Record<number, { title: string; subtitle: string }> = {
    1: { title: t('auth.step1.title'), subtitle: t('auth.step1.subtitle') },
    2: { title: t('auth.step2.title'), subtitle: t('auth.step2.subtitle') },
    3: { title: t('auth.step3.title'), subtitle: t('auth.step3.subtitle') },
    4: { title: t('auth.step4.title'), subtitle: t('auth.step4.subtitle') },
    5: { title: t('auth.step5.title'), subtitle: t('auth.step5.subtitle') },
  }

  const goNext = () => {
    setDirection(1)
    nextStep()
  }

  const goBack = () => {
    setDirection(-1)
    prevStep()
  }

  const fireConfetti = () => {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } })
    setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0 } }), 200)
    setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1 } }), 400)
  }

  const finishOnboarding = (partial?: Partial<typeof user>) => {
    updateUser({ ...partial, onboardingComplete: true, avatarUrl: avatarUrl || undefined })
    fireConfetti()
    setComplete(true)
  }

  if (complete) {
    return (
      <div className="flex min-h-dvh flex-col bg-background lg:flex-row">
        <AuthIllustration />
        <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-10">
          <OnboardingSuccess />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background lg:flex-row">
      <AuthIllustration />

      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between p-4 sm:p-6">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Dumbbell className="h-4 w-4" />
            </span>
            FitTrack
          </Link>
          <div className="flex gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pb-8 sm:px-6">
          {step > 1 && (
            <Button variant="ghost" size="sm" className="mb-4 w-fit gap-1" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
              {t('auth.back')}
            </Button>
          )}

          <StepIndicator current={step} />

          <h1 className="text-2xl font-bold sm:text-3xl">{titles[step]?.title}</h1>
          <p className="mt-2 text-muted-foreground">{titles[step]?.subtitle}</p>

          <div className="mt-8 flex-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 1 && (
                  <Step1CreateAccount
                    defaultValues={{ fullName: user?.fullName, email: user?.email }}
                    onSubmit={(data: Step1Form) => {
                      setUser({ fullName: data.fullName, email: data.email })
                      goNext()
                    }}
                    onGoogleSignIn={(googleUser) => {
                      setUser({
                        fullName: googleUser.fullName,
                        email: googleUser.email,
                        avatarUrl: googleUser.avatarUrl,
                        authProvider: 'google',
                      })
                      setAvatarUrl(googleUser.avatarUrl)
                      goNext()
                    }}
                  />
                )}
                {step === 2 && (
                  <Step2PersonalDetails
                    defaultValues={{
                      dob: user?.dob,
                      gender: user?.gender as Step2Form['gender'],
                      height: user?.height,
                      weight: user?.weight,
                      weightUnit: user?.weightUnit,
                    }}
                    onSubmit={(data: Step2Form) => {
                      updateUser(data)
                      goNext()
                    }}
                  />
                )}
                {step === 3 && (
                  <Step3FitnessGoals
                    defaultValues={{ goals: user?.goals }}
                    onSubmit={(data: Step3Form) => {
                      updateUser(data)
                      goNext()
                    }}
                  />
                )}
                {step === 4 && (
                  <Step4ActivityLevel
                    defaultValues={{ activityLevel: user?.activityLevel }}
                    onSubmit={(data: Step4Form) => {
                      updateUser(data)
                      goNext()
                    }}
                    onSkip={() => {
                      setDirection(1)
                      setStep(5)
                    }}
                  />
                )}
                {step === 5 && (
                  <Step5ProfileSetup
                    avatarUrl={avatarUrl}
                    onAvatarChange={setAvatarUrl}
                    defaultValues={{
                      username: user?.username,
                      bio: user?.bio,
                      ...user?.notifications,
                    }}
                    onSubmit={(data: Step5Form) => {
                      updateUser({
                        username: data.username,
                        bio: data.bio,
                        notifications: {
                          workoutReminders: data.workoutReminders,
                          mealTips: data.mealTips,
                          weeklyReport: data.weeklyReport,
                        },
                      })
                      finishOnboarding()
                    }}
                    onSkip={() => finishOnboarding()}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

function AuthIllustration() {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-emerald-600 to-teal-800 lg:flex lg:w-[45%] lg:flex-col lg:justify-between lg:p-12">
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute right-8 top-1/4 h-32 w-32 rounded-3xl bg-white/10 backdrop-blur"
      />
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/4 left-8 h-24 w-24 rounded-full bg-white/10 backdrop-blur"
      />
      <div className="relative z-10 mt-auto">
        <p className="text-3xl font-bold leading-tight text-white">
          Your journey to a stronger you starts here.
        </p>
        <p className="mt-4 max-w-sm text-white/80">
          Join 50,000+ athletes tracking progress with FitTrack.
        </p>
      </div>
    </div>
  )
}
