import { useLocale, useTranslations } from 'next-intl';
import LanguageNav from './LanguageNav';
import MobileNav from './MobileNav';
import Link from 'next/link';

export default function Banner() {
  const locale = useLocale();
  const t = useTranslations('Nav');

  return (
    <div className="container mx-auto flex justify-between p-2">
      <MobileNav />
      <div className="hidden md:flex flex-row gap-4 items-center">
        <Link href={`/${locale}/about`} className="mr-4 hover:text-secondary">
          {t('About This Site')}
        </Link>
        <Link href={`/${locale}/about/to-do-list`} className="mr-4 hover:text-secondary">
          {t('To-Do List')}
        </Link>
        <Link href={`/${locale}/about/feedback`} className="mr-4 hover:text-secondary">
          {t('Feedback')}
        </Link>
      </div>
      <LanguageNav locale={locale} />
    </div>
  );
}
