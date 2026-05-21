import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus, Salad } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const initialMeals = [
  { id: '1', name: 'Oatmeal & berries', meal: 'Breakfast', calories: 420 },
  { id: '2', name: 'Grilled chicken salad', meal: 'Lunch', calories: 580 },
]

export function DashboardNutrition() {
  const { t } = useTranslation()
  const [meals, setMeals] = useState(initialMeals)
  const [food, setFood] = useState('')
  const [calories, setCalories] = useState('')

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0)

  const logMeal = (e: React.FormEvent) => {
    e.preventDefault()
    if (!food.trim()) return
    setMeals((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: food.trim(),
        meal: t('dashboard.pages.nutrition.snack'),
        calories: Number(calories) || 200,
      },
    ])
    setFood('')
    setCalories('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t('dashboard.pages.nutrition.title')}</h2>
        <p className="text-muted-foreground">{t('dashboard.pages.nutrition.subtitle')}</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t('dashboard.pages.nutrition.today')}</CardTitle>
            <p className="text-3xl font-bold text-primary">
              {totalCalories}{' '}
              <span className="text-base font-normal text-muted-foreground">/ 2,200 kcal</span>
            </p>
          </div>
          <Salad className="h-10 w-10 text-primary/60" />
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.logMeal')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={logMeal} className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="food">{t('dashboard.pages.nutrition.food')}</Label>
              <Input
                id="food"
                placeholder={t('dashboard.pages.nutrition.foodPlaceholder')}
                value={food}
                onChange={(e) => setFood(e.target.value)}
              />
            </div>
            <div className="w-full space-y-2 sm:w-32">
              <Label htmlFor="cal">{t('dashboard.pages.nutrition.calories')}</Label>
              <Input
                id="cal"
                type="number"
                placeholder="200"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
            </div>
            <Button type="submit" className="gap-2 sm:mb-0">
              <Plus className="h-4 w-4" />
              {t('dashboard.pages.nutrition.add')}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {meals.map((meal) => (
          <Card key={meal.id}>
            <CardContent className="flex items-center justify-between py-4">
              <div>
                <p className="font-semibold">{meal.name}</p>
                <p className="text-sm text-muted-foreground">{meal.meal}</p>
              </div>
              <span className="font-bold text-primary">{meal.calories} kcal</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
