'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import { Category } from '@/lib/productTypes';
import {
  homeCategory,
  cosmeticsCategory,
  electronicsCategory,
  fashionCategory,
  autoCategory,
  sportsCategory,
} from '@/lib/constants';
import { getCategories } from '@/app/actions/api';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Nav() {
  const [cats, setCats] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getCategories();
      setCats(categories);
    }
    fetchCategories();
  }, []);

  return (
    <NavigationMenu viewport={false} className="hidden md:block z-50 mt-4">
      <NavigationMenuList>
        <NavigationMenuItem className="bg-white">
          <List title="Home" categories={homeCategory} categoryData={cats} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <List title="Electronics" categories={electronicsCategory} categoryData={cats} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <List title="Cosmetics" categories={cosmeticsCategory} categoryData={cats} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <List title="Fashion" categories={fashionCategory} categoryData={cats} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <List title="Automotive" categories={autoCategory} categoryData={cats} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <List title="Sports" categories={sportsCategory} categoryData={cats} />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function List({
  title,
  categories,
  categoryData,
}: Readonly<{ title: string; categories: readonly string[]; categoryData?: Category[] }>) {
  const t = useTranslations('Nav');
  if (categories.length === 0) {
    return null;
  }

  if (categories.length === 1) {
    const cat = categoryData?.find((cat) => cat.slug === categories[0]) || { slug: categories[0], name: categories[0] };
    return (
      <NavigationMenuLink href={`/products/${cat?.slug}`} title={cat?.name} className="">
        {t(cat.name)}
      </NavigationMenuLink>
    );
  }

  return (
    <>
      <NavigationMenuTrigger>{t(title)}</NavigationMenuTrigger>
      <NavigationMenuContent className="bg-white">
        {categories.map((category) => {
          const cat = categoryData?.find((cat) => cat.slug === category);
          if (cat) {
            return (
              <NavigationMenuLink
                key={category}
                href={`/products/${cat.slug}`}
                title={cat.name}
                className="block px-4 py-2 hover:font-bold w-45"
              >
                {t(cat.name)}
              </NavigationMenuLink>
            );
          }
        })}
      </NavigationMenuContent>
    </>
  );
}
