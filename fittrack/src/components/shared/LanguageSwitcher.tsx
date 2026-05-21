import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  const toggle = () => {
    const next = i18n.language === 'en' ? 'hi' : 'en'
    i18n.changeLanguage(next)
    localStorage.setItem('fittrack-lang', next)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      aria-label={t('lang.switch')}
      className="font-semibold uppercase"
    >
      {i18n.language === 'en' ? 'हि' : 'EN'}
    </Button>
  )
}
