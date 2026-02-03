import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Nav from "@/components/Nav/Nav";
import Image from "next/image";
import Link from "next/link";
import Search from "@/components/Nav/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

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
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body className="container mx-auto my-4 px-4">
          <div className="flex justify-between align-top">
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
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>My Account</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink href={`/${locale}/my-account`} className="w-35 hover:bg-secondary hover:font-bold">
                        My Profile
                      </NavigationMenuLink>
                      <NavigationMenuLink href={`/${locale}/my-account/saved-carts`} className="w-35 hover:bg-secondary hover:font-bold">
                        My Saved Carts
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Link href={`/${locale}/cart`}>
                <FontAwesomeIcon icon={faCartShopping} className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <Nav />
          {children}
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
