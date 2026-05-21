import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GoogleIcon } from '@/components/auth/GoogleIcon'

export interface GoogleUserData {
  fullName: string
  email: string
  avatarUrl: string
}

interface GoogleSignInButtonProps {
  onSuccess: (data: GoogleUserData) => void
}

const GOOGLE_ACCOUNTS: GoogleUserData[] = [
  {
    fullName: 'Priyanshu Raj',
    email: 'priyanshu.raj@gmail.com',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priyanshu',
  },
  {
    fullName: 'Alex Rivera',
    email: 'alex.rivera@gmail.com',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  },
]

function avatarFallback(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function GoogleSignInButton({ onSuccess }: GoogleSignInButtonProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)

  const openGoogleFlow = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    setLoading(false)
    setPickerOpen(true)
  }

  const selectAccount = (account: GoogleUserData) => {
    setPickerOpen(false)
    onSuccess(account)
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="w-full gap-2"
        onClick={openGoogleFlow}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon className="h-4 w-4" />
        )}
        {loading ? t('auth.googleLoading') : t('auth.google')}
      </Button>

      <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
        <DialogContent className="max-w-sm gap-0 overflow-hidden p-0 sm:rounded-2xl">
          <DialogHeader className="border-b border-border bg-muted/30 px-6 py-5 text-center">
            <div className="mx-auto mb-3 flex items-center gap-2">
              <GoogleIcon className="h-6 w-6" />
              <span className="text-lg font-medium text-muted-foreground">Google</span>
            </div>
            <DialogTitle className="text-base font-normal">
              {t('auth.googlePicker.title')}
            </DialogTitle>
            <DialogDescription>{t('auth.googlePicker.subtitle')}</DialogDescription>
          </DialogHeader>

          <div className="p-2">
            {GOOGLE_ACCOUNTS.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => selectAccount(account)}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-muted"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={account.avatarUrl} alt={account.fullName} />
                  <AvatarFallback>{avatarFallback(account.fullName)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{account.fullName}</p>
                  <p className="truncate text-sm text-muted-foreground">{account.email}</p>
                </div>
              </button>
            ))}
          </div>

          <p className="border-t border-border px-6 py-3 text-center text-xs text-muted-foreground">
            {t('auth.googlePicker.mockNote')}
          </p>
        </DialogContent>
      </Dialog>
    </>
  )
}
