import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Dumbbell, LineChart, UtensilsCrossed } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { ActivityChart } from '@/components/dashboard/ActivityChart'
import { TodayWorkout } from '@/components/dashboard/TodayWorkout'

export function DashboardHome() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <StatsCards />

      <div className="flex flex-wrap gap-3">
        <Button className="gap-2" onClick={() => navigate('/dashboard/workouts')}>
          <Dumbbell className="h-4 w-4" />
          {t('dashboard.startWorkout')}
        </Button>
        <Button variant="outline" className="gap-2" onClick={() => navigate('/dashboard/nutrition')}>
          <UtensilsCrossed className="h-4 w-4" />
          {t('dashboard.logMeal')}
        </Button>
        <Button variant="outline" className="gap-2" onClick={() => navigate('/dashboard/progress')}>
          <LineChart className="h-4 w-4" />
          {t('dashboard.viewProgress')}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TodayWorkout />
        <ActivityChart />
      </div>
    </div>
  )
}
