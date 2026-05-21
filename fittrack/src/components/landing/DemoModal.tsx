import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'

interface DemoModalProps {
  trigger: React.ReactNode
}

export function DemoModal({ trigger }: DemoModalProps) {
  const { t } = useTranslation()

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl overflow-hidden p-0">
        <DialogHeader className="border-b border-border px-6 py-4">
          <DialogTitle>{t('hero.demo.title')}</DialogTitle>
          <DialogDescription>{t('hero.demo.subtitle')}</DialogDescription>
        </DialogHeader>
        <div className="relative aspect-video w-full bg-black">
          <iframe
            title={t('hero.demo.title')}
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/MLpWrANjFbI?autoplay=0&rel=0&modestbranding=1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="px-6 pb-4 text-center text-xs text-muted-foreground">
          {t('hero.demo.note')}
        </p>
      </DialogContent>
    </Dialog>
  )
}

export function DemoModalButton() {
  const { t } = useTranslation()

  return (
    <DemoModal
      trigger={
        <Button size="lg" variant="outline" className="min-w-[200px] gap-2">
          <Play className="h-4 w-4 fill-current" />
          {t('hero.ctaSecondary')}
        </Button>
      }
    />
  )
}
