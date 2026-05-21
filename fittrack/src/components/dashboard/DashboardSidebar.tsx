import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Dumbbell,
  Home,
  LayoutDashboard,
  LogOut,
  Salad,
  Settings,
  TrendingUp,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'

export const dashboardNavItems = [
  { to: '/dashboard', icon: Home, key: 'dashboard.nav.home', end: true },
  { to: '/dashboard/workouts', icon: Dumbbell, key: 'dashboard.nav.workouts' },
  { to: '/dashboard/nutrition', icon: Salad, key: 'dashboard.nav.nutrition' },
  { to: '/dashboard/progress', icon: TrendingUp, key: 'dashboard.nav.progress' },
  { to: '/dashboard/settings', icon: Settings, key: 'dashboard.nav.settings' },
] as const

function isNavActive(pathname: string, to: string, end?: boolean) {
  if (end) return pathname === to || pathname === `${to}/`
  return pathname === to || pathname.startsWith(`${to}/`)
}

export function DashboardSidebar() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
      <Link
        to="/dashboard"
        className="flex h-16 items-center gap-2 border-b border-border px-6 font-bold hover:text-primary"
      >
        <LayoutDashboard className="h-5 w-5 text-primary" />
        FitTrack
      </Link>
      <nav className="flex flex-1 flex-col gap-1 p-4">
        {dashboardNavItems.map((item) => (
          <Link
            key={item.key}
            to={item.to}
            className={cn(
              'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
              isNavActive(pathname, item.to, 'end' in item && item.end)
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <item.icon className="h-5 w-5" />
            {t(item.key)}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        onClick={handleLogout}
        className="m-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
      >
        <LogOut className="h-5 w-5" />
        {t('dashboard.pages.settings.logout')}
      </button>
    </aside>
  )
}

export function DashboardMobileNav() {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-border bg-card/95 backdrop-blur lg:hidden">
      {dashboardNavItems.map((item) => (
        <Link
          key={item.key}
          to={item.to}
          className={cn(
            'flex flex-1 flex-col items-center gap-1 py-3 text-xs',
            isNavActive(pathname, item.to, 'end' in item && item.end)
              ? 'text-primary'
              : 'text-muted-foreground',
          )}
        >
          <item.icon className="h-5 w-5" />
          <span className="truncate px-1">{t(item.key)}</span>
        </Link>
      ))}
    </nav>
  )
}
