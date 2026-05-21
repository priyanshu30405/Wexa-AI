import { Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const testimonials = [
  { name: 'Sarah Chen', role: 'Marathon Runner', quote: 'FitTrack transformed how I train. The analytics alone are worth it.', rating: 5, initials: 'SC' },
  { name: 'Marcus Johnson', role: 'CrossFit Coach', quote: 'Clean UI, powerful features. My clients love the progress tracking.', rating: 5, initials: 'MJ' },
  { name: 'Priya Sharma', role: 'Yoga Instructor', quote: 'Finally an app that feels premium. Onboarding was smooth and intuitive.', rating: 5, initials: 'PS' },
  { name: 'Alex Rivera', role: 'Gym Enthusiast', quote: 'Lost 15 lbs in 3 months. The nutrition plans are spot on.', rating: 5, initials: 'AR' },
]

export function TestimonialsSection() {
  const { t } = useTranslation()

  return (
    <section id="testimonials" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('testimonials.title')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('testimonials.subtitle')}</p>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item, i) => (
            <ScrollReveal key={item.name} delay={i * 0.08}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-0.5">
                    {Array.from({ length: item.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{item.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{item.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
