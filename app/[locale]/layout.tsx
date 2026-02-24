import { NextIntlClientProvider } from 'next-intl';

import { getDynamicMessages } from '@/i18n/dynamicMessages';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
import Nav from '@/components/Nav/Nav';
import Image from 'next/image';
import Link from 'next/link';
import Search from '@/components/Nav/Search';
import MyAccountNav from '@/components/Nav/MyAccountNav';
import MiniCart from '@/components/MiniCart';
import MobileMiniCart from '@/components/MobileMiniCart';
import Banner from '@/components/Nav/Banner';
import Footer from '@/components/Footer';
import DisclaimerSheet from '@/components/DisclaimerSheet';

type Locale = (typeof routing.locales)[number];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getDynamicMessages(locale);

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body className="container mx-auto mb-4 px-4">
          <div className="relative w-screen left-1/2 -ml-[50vw] -mr-[50vw] right-1/2 bg-primary text-white">
            <Banner />
          </div>
          <div className="flex justify-between align-top mt-4">
            <Link href={`/${locale}`}>
              <Image
                src="/logo-image.jpg"
                alt="Logo"
                width={150}
                height={112}
                className="w-15 sm:w-32 m-2"
                style={{ height: 'auto' }}
              />
            </Link>
            <div className="flex flex-row gap-4 items-center h-10">
              <Search className="hidden" />
              <MyAccountNav locale={locale} />
              <MobileMiniCart />
              <MiniCart />
            </div>
          </div>
          <Nav />
          <div className="container border-b-2 border-primary" />
          {children}
          <Footer />
          <DisclaimerSheet />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
