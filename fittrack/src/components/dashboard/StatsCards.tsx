import { Flame, Target, TrendingUp, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'

const stats = [
  { key: 'dashboard.calories', value: '2,340', icon: Flame, change: '+12%' },
  { key: 'dashboard.workouts', value: '5', icon: Zap, change: '+2' },
  { key: 'dashboard.streak', value: '14', icon: TrendingUp, change: 'days' },
  { key: 'dashboard.goalProgress', value: '78%', icon: Target, change: '+5%' },
]

export function StatsCards() {
  const { t } = useTranslation()

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t(stat.key)}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-primary">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
