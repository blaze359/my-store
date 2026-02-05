import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";


export default function LanguageNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-primary">
            English
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink
              href={`/en`}
              className="w-35 hover:bg-secondary hover:font-bold"
            >
              English
            </NavigationMenuLink>
            <NavigationMenuLink
              href={`/es`}
              className="w-35 hover:bg-secondary hover:font-bold"
            >
              Spanish
            </NavigationMenuLink>
            <NavigationMenuLink
              href={`/fr`}
              className="w-35 hover:bg-secondary hover:font-bold"
            >
              French
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
