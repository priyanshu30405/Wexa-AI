import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from '@/pages/LandingPage'
import { AuthPage } from '@/pages/AuthPage'
import { DashboardLayout } from '@/pages/dashboard/DashboardLayout'
import { DashboardHome } from '@/pages/dashboard/DashboardHome'
import { DashboardWorkouts } from '@/pages/dashboard/DashboardWorkouts'
import { DashboardNutrition } from '@/pages/dashboard/DashboardNutrition'
import { DashboardProgress } from '@/pages/dashboard/DashboardProgress'
import { DashboardSettings } from '@/pages/dashboard/DashboardSettings'
import { ProtectedRoute } from '@/components/shared/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="workouts" element={<DashboardWorkouts />} />
          <Route path="nutrition" element={<DashboardNutrition />} />
          <Route path="progress" element={<DashboardProgress />} />
          <Route path="settings" element={<DashboardSettings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
