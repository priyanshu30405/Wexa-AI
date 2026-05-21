import { Link } from 'react-router-dom'
import { Dumbbell, Link2, Mail, MessageCircle, Share2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'Changelog'],
  Company: ['About', 'Careers', 'Blog', 'Press'],
  Support: ['Help Center', 'Contact', 'Privacy', 'Terms'],
}

const social = [
  { icon: Share2, href: '#', label: 'Share' },
  { icon: MessageCircle, href: '#', label: 'Community' },
  { icon: Mail, href: '#', label: 'Email' },
  { icon: Link2, href: '#', label: 'Links' },
]

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Dumbbell className="h-5 w-5" />
              </span>
              FitTrack
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">{t('footer.newsletterDesc')}</p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="Email" className="max-w-xs" aria-label="Newsletter email" />
              <Button type="submit" size="sm">
                {t('footer.subscribe')}
              </Button>
            </form>
            <div className="mt-6 flex gap-3">
              {social.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold">{title}</h4>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          {t('footer.rights')}
        </div>
      </div>
    </footer>
  )
}
