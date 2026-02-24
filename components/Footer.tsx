'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="mt-12 border-t-2 border-primary py-10 text-center text-sm text-muted-foreground flex flex-col items-center justify-center gap-6 md:gap-2">
      <div className="flex flex-col md:flex-row gap-2">
        <p>{t('Check out my profile site')}</p>
        <a href="https://blaze359.github.io/" className="underline hover:text-primary">
          https://blaze359.github.io/
        </a>
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <p>{t('Source code used for this demo')}</p>
        <a href="https://github.com/blaze359/my-store" className="underline hover:text-primary">
          https://github.com/blaze359/my-store
        </a>
      </div>
    </footer>
  );
}
