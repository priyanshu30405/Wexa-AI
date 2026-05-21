import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Clock, Flame, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TodayWorkout } from '@/components/dashboard/TodayWorkout'

const plans = [
  { id: '1', name: 'Upper Body Strength', duration: '45 min', calories: 320, level: 'Intermediate' },
  { id: '2', name: 'HIIT Cardio Blast', duration: '30 min', calories: 280, level: 'Advanced' },
  { id: '3', name: 'Core & Flexibility', duration: '25 min', calories: 150, level: 'Beginner' },
]

export function DashboardWorkouts() {
  const { t } = useTranslation()
  const [activePlan, setActivePlan] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t('dashboard.pages.workouts.title')}</h2>
        <p className="text-muted-foreground">{t('dashboard.pages.workouts.subtitle')}</p>
      </div>

      {activePlan ? (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-4 py-8 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-primary">{t('dashboard.pages.workouts.inProgress')}</p>
              <p className="text-xl font-bold">
                {plans.find((p) => p.id === activePlan)?.name}
              </p>
            </div>
            <Button variant="outline" onClick={() => setActivePlan(null)}>
              {t('dashboard.pages.workouts.endWorkout')}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.level}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {plan.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="h-4 w-4 text-accent" />
                    {plan.calories} kcal
                  </span>
                </div>
                <Button className="w-full gap-2" onClick={() => setActivePlan(plan.id)}>
                  <Play className="h-4 w-4" />
                  {t('dashboard.startWorkout')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <TodayWorkout />
    </div>
  )
}
