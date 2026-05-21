import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserProfile {
  fullName: string
  email: string
  dob?: string
  gender?: string
  height?: number
  weight?: number
  heightUnit?: 'cm' | 'ft'
  weightUnit?: 'kg' | 'lbs'
  goals?: string[]
  activityLevel?: string
  username?: string
  bio?: string
  avatarUrl?: string
  notifications?: {
    workoutReminders: boolean
    mealTips: boolean
    weeklyReport: boolean
  }
  onboardingComplete?: boolean
  authProvider?: 'email' | 'google'
}

interface AuthState {
  user: UserProfile | null
  isAuthenticated: boolean
  setUser: (user: UserProfile) => void
  updateUser: (partial: Partial<UserProfile>) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : null,
          isAuthenticated: !!state.user || !!partial.email,
        })),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'fittrack-auth' },
  ),
)
