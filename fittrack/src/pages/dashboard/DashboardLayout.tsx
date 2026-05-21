import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'
import { DashboardSidebar, DashboardMobileNav } from '@/components/dashboard/DashboardSidebar'
import { useAuthStore } from '@/store/authStore'

export function DashboardLayout() {
  const { t } = useTranslation()
  const user = useAuthStore((s) => s.user)
  const name = user?.username ?? user?.fullName?.split(' ')[0] ?? 'Athlete'
  const initials = name.slice(0, 2).toUpperCase()

  return (
    <div className="flex min-h-dvh bg-background">
      <DashboardSidebar />

      <div className="flex flex-1 flex-col pb-20 lg:pb-0">
        <header className="flex items-center justify-between border-b border-border bg-card/50 px-4 py-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11">
              {user?.avatarUrl && <AvatarImage src={user.avatarUrl} alt={name} />}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-bold sm:text-xl">
                {t('dashboard.welcome', { name })}
              </h1>
              <p className="text-sm text-muted-foreground">{t('dashboard.subtitle')}</p>
            </div>
          </div>
          <div className="flex gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>

      <DashboardMobileNav />
    </div>
  )
}
