export const FITNESS_GOALS = [
  { id: 'lose-weight', emoji: '🔥', key: 'goals.loseWeight' },
  { id: 'build-muscle', emoji: '💪', key: 'goals.buildMuscle' },
  { id: 'stay-active', emoji: '🏃', key: 'goals.stayActive' },
  { id: 'flexibility', emoji: '🧘', key: 'goals.flexibility' },
  { id: 'eat-healthier', emoji: '🥗', key: 'goals.eatHealthier' },
  { id: 'reduce-stress', emoji: '🧠', key: 'goals.reduceStress' },
] as const

export const ACTIVITY_LEVELS = [
  { id: 'sedentary', key: 'activity.sedentary', descKey: 'activity.sedentaryDesc' },
  { id: 'light', key: 'activity.light', descKey: 'activity.lightDesc' },
  { id: 'moderate', key: 'activity.moderate', descKey: 'activity.moderateDesc' },
  { id: 'very', key: 'activity.very', descKey: 'activity.veryDesc' },
  { id: 'athlete', key: 'activity.athlete', descKey: 'activity.athleteDesc' },
] as const

export const MOCK_WORKOUTS = [
  { id: '1', name: 'Warm-up jog', done: true },
  { id: '2', name: 'Squats × 15', done: true },
  { id: '3', name: 'Push-ups × 12', done: false },
  { id: '4', name: 'Plank 60s', done: false },
  { id: '5', name: 'Cool-down stretch', done: false },
]

export const WEEKLY_ACTIVITY = [
  { day: 'Mon', minutes: 45 },
  { day: 'Tue', minutes: 30 },
  { day: 'Wed', minutes: 60 },
  { day: 'Thu', minutes: 20 },
  { day: 'Fri', minutes: 55 },
  { day: 'Sat', minutes: 75 },
  { day: 'Sun', minutes: 40 },
]
