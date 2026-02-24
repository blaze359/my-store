'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { Button } from './ui/button';

const COOKIE_NAME = 'translations-confirmed';
const COOKIE_EXPIRY_DAYS = 365;

// Helper functions for cookie management
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;

  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

export default function DisclaimerSheet() {
  const t = useTranslations('Footer');
  const [isSheetOpen, setIsSheetOpen] = useState(() => {
    // Check if cookie exists on initial render
    const hasConfirmed = getCookie(COOKIE_NAME);
    return !hasConfirmed;
  });

  const handleConfirm = () => {
    setCookie(COOKIE_NAME, 'true', COOKIE_EXPIRY_DAYS);
    setIsSheetOpen(false);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={() => {}}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="p-6"
      >
        <SheetHeader>
          <SheetTitle>{t('Translation Disclaimer')}</SheetTitle>
          <SheetDescription className="flex flex-col gap-4">
            <div>{t('translation-disclaimer-1')}</div>
            <div>{t('translation-disclaimer-2')}</div>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter className="w-50 justify-center items-center mx-auto">
          <Button onClick={handleConfirm} className="w-full">
            {t('I Understand')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
