import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

type MyAccountNavProps = {
  locale: string;
};

export default function MyAccountNav({ locale }: Readonly<MyAccountNavProps>) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>My Account</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink
              href={`/${locale}/my-account`}
              className="w-35 hover:bg-secondary hover:font-bold"
            >
              My Profile
            </NavigationMenuLink>
            <NavigationMenuLink
              href={`/${locale}/my-account/saved-carts`}
              className="w-35 hover:bg-secondary hover:font-bold"
            >
              My Saved Carts
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
