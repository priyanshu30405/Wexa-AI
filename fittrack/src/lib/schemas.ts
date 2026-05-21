import { z } from 'zod'

export const step1Schema = z
  .object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Include at least one uppercase letter')
      .regex(/[0-9]/, 'Include at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const step2Schema = z.object({
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other'], { message: 'Please select gender' }),
  height: z.number().min(100).max(250),
  weight: z.number().min(30).max(300),
  weightUnit: z.enum(['kg', 'lbs']),
})

export const step3Schema = z.object({
  goals: z.array(z.string()).min(1, 'Select at least one goal').max(3, 'Select up to 3 goals'),
})

export const step4Schema = z.object({
  activityLevel: z.string().min(1, 'Please select your activity level'),
})

export const step5Schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(20),
  bio: z.string().max(160).optional(),
  workoutReminders: z.boolean(),
  mealTips: z.boolean(),
  weeklyReport: z.boolean(),
})

export type Step1Form = z.infer<typeof step1Schema>
export type Step2Form = z.infer<typeof step2Schema>
export type Step3Form = z.infer<typeof step3Schema>
export type Step4Form = z.infer<typeof step4Schema>
export type Step5Form = z.infer<typeof step5Schema>
