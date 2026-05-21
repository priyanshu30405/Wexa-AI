import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const user = useAuthStore((s) => s.user)

  const canAccess = isAuthenticated || user?.onboardingComplete || !!user?.email

  if (!canAccess) {
    return <Navigate to="/auth" replace />
  }

  return <>{children}</>
}
