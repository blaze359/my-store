import { NextIntlClientProvider } from "next-intl";

import { getDynamicMessages } from '@/i18n/dynamicMessages';
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Nav from "@/components/Nav/Nav";
import Image from "next/image";
import Link from "next/link";
import Search from "@/components/Nav/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import LanguageNav from "@/components/Nav/LanguageNav";
import MyAccountNav from "@/components/Nav/MyAccountNav";

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
            <div className="container mx-auto flex justify-between p-2">
              <div className="flex flex-row gap-4 items-center">
                <Link href={`/${locale}/about`} className="mr-4 hover:text-secondary">
                  About This Site
                </Link>
                <Link href={`/${locale}/about/to-do-list`} className="hover:text-secondary">
                  To-Do List
                </Link>
              </div>
              <LanguageNav locale={locale} />
            </div>
          </div>
          <div className="flex justify-between align-top mt-4">
            <Link href={`/${locale}`}>
              <Image
                src="/logo-image.jpg"
                alt="Logo"
                width={150}
                height={150}
              />
            </Link>
            <div className="flex flex-row gap-4 items-center h-10">
              <Search />
              <MyAccountNav locale={locale} />
              <Link href={`/${locale}/cart`}>
                <FontAwesomeIcon icon={faCartShopping} className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <Nav />
          <div className="container border-b-2 border-primary" />
          {children}
          <footer className="mt-12 border-t-2 border-primary py-10 text-center text-sm text-muted-foreground flex flex-row justify-center gap-2">
            <p>Check out my profile site</p>
            <a
              href="https://blaze359.github.io/"
              className="underline hover:text-primary"
            >
              https://blaze359.github.io/
            </a>
          </footer>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
