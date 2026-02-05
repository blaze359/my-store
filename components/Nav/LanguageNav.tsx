

'use client';

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";


type LanguageNavProps = {
  locale: string;
};

export default function LanguageNav({ locale }: Readonly<LanguageNavProps>) {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  // Remove the locale prefix from the pathname
  const pathnameWithoutLocale = pathname.replace(/^\/(en|es|fr)/, "") || "/";

  let languageLabel = t('English');
  if (locale === 'es') {
    languageLabel = t('Spanish');
  } else if (locale === 'fr') {
    languageLabel = t('French');
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-primary">
            {languageLabel}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink
              href={`/en${pathnameWithoutLocale}`}
              className="w-35 hover:bg-secondary hover:font-bold"
            >
              {t('English')}
            </NavigationMenuLink>
            <NavigationMenuLink
              href={`/es${pathnameWithoutLocale}`}
              className="w-35 hover:bg-secondary hover:font-bold"
            >
              {t('Spanish')}
            </NavigationMenuLink>
            <NavigationMenuLink
              href={`/fr${pathnameWithoutLocale}`}
              className="w-35 hover:bg-secondary hover:font-bold"
            >
              {t('French')}
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
