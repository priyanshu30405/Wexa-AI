import { useTranslation } from 'react-i18next'
import { Target, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ActivityChart } from '@/components/dashboard/ActivityChart'
import { Progress } from '@/components/ui/progress'

const goals = [
  { name: 'Build Muscle', progress: 78, target: '12 weeks' },
  { name: 'Weekly workouts', progress: 83, target: '5 / 6 days' },
  { name: 'Protein intake', progress: 65, target: '130g daily' },
]

export function DashboardProgress() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t('dashboard.pages.progress.title')}</h2>
        <p className="text-muted-foreground">{t('dashboard.pages.progress.subtitle')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {goals.map((goal) => (
          <Card key={goal.name}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">{goal.name}</CardTitle>
              </div>
              <p className="text-xs text-muted-foreground">{goal.target}</p>
            </CardHeader>
            <CardContent>
              <div className="mb-2 flex justify-between text-sm font-semibold">
                <span>{goal.progress}%</span>
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <Progress value={goal.progress} />
            </CardContent>
          </Card>
        ))}
      </div>

      <ActivityChart />

      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.pages.progress.milestones')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: '14-day streak', done: true },
            { label: '50 workouts completed', done: true },
            { label: '100 workouts completed', done: false },
          ].map((m) => (
            <div key={m.label} className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  m.done ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                {m.done ? '✓' : '○'}
              </span>
              <span className={m.done ? 'font-medium' : 'text-muted-foreground'}>{m.label}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
