import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useTranslations } from 'next-intl';

type MyAccountNavProps = {
  locale: string;
};

export default function MyAccountNav({ locale }: Readonly<MyAccountNavProps>) {
  const t = useTranslations('Nav');

  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t('My Account')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink
              href={`/${locale}/my-account`}
              className="w-35 hover:bg-secondary hover:font-bold"
            >
              {t('My Profile')}
            </NavigationMenuLink>
            <NavigationMenuLink
              href={`/${locale}/my-account/saved-carts`}
              className="w-35 hover:bg-secondary hover:font-bold"
            >
              {t('My Saved Carts')}
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
