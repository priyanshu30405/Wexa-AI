import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Bell, Globe, Moon, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'

export function DashboardSettings() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const updateUser = useAuthStore((s) => s.updateUser)
  const logout = useAuthStore((s) => s.logout)
  const { theme, toggleTheme } = useThemeStore()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t('dashboard.pages.settings.title')}</h2>
        <p className="text-muted-foreground">{t('dashboard.pages.settings.subtitle')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {t('dashboard.pages.settings.profile')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="settings-name">{t('auth.step1.fullName')}</Label>
            <Input
              id="settings-name"
              className="mt-1.5"
              defaultValue={user?.fullName}
              onBlur={(e) => updateUser({ fullName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="settings-email">{t('auth.step1.email')}</Label>
            <Input id="settings-email" className="mt-1.5" defaultValue={user?.email} disabled />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            {t('auth.step5.notifications')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(
            [
              ['workoutReminders', t('auth.step5.workoutReminders')],
              ['mealTips', t('auth.step5.mealTips')],
              ['weeklyReport', t('auth.step5.weeklyReport')],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <Label>{label}</Label>
              <Switch
                checked={user?.notifications?.[key] ?? false}
                onCheckedChange={(checked) =>
                  updateUser({
                    notifications: {
                      workoutReminders: user?.notifications?.workoutReminders ?? true,
                      mealTips: user?.notifications?.mealTips ?? true,
                      weeklyReport: user?.notifications?.weeklyReport ?? false,
                      [key]: checked,
                    },
                  })
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <Moon className="h-5 w-5" />
            <span className="font-medium">{t('theme.toggle')}</span>
          </div>
          <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5" />
            <span className="font-medium">{t('lang.switch')}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const next = i18n.language === 'en' ? 'hi' : 'en'
              i18n.changeLanguage(next)
              localStorage.setItem('fittrack-lang', next)
            }}
          >
            {i18n.language === 'en' ? 'हिन्दी' : 'English'}
          </Button>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10" onClick={handleLogout}>
        {t('dashboard.pages.settings.logout')}
      </Button>
    </div>
  )
}
