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
import { Skeleton } from '../ui/skeleton';

export default function Nav() {
  const [cats, setCats] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchCategories() {
      try {
        const categories = await getCategories();
        if (isMounted) {
          setCats(categories);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <NavigationMenu viewport={false} className="hidden md:block z-50 mt-4">
      <NavigationMenuList>
        <NavigationMenuItem className="bg-white">
          <List title="Home" categories={homeCategory} categoryData={cats} isLoading={isLoading} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <List
            title="Electronics"
            categories={electronicsCategory}
            categoryData={cats}
            isLoading={isLoading}
          />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <List
            title="Cosmetics"
            categories={cosmeticsCategory}
            categoryData={cats}
            isLoading={isLoading}
          />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <List
            title="Fashion"
            categories={fashionCategory}
            categoryData={cats}
            isLoading={isLoading}
          />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <List
            title="Automotive"
            categories={autoCategory}
            categoryData={cats}
            isLoading={isLoading}
          />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <List
            title="Sports"
            categories={sportsCategory}
            categoryData={cats}
            isLoading={isLoading}
          />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function List({
  title,
  categories,
  categoryData,
  isLoading,
}: Readonly<{
  title: string;
  categories: readonly string[];
  categoryData?: Category[];
  isLoading: boolean;
}>) {
  const t = useTranslations('Nav');
  if (categories.length === 0) {
    return null;
  }

  if (categories.length === 1) {
    const cat = categoryData?.find((cat) => cat.slug === categories[0]) || {
      slug: categories[0],
      name: categories[0],
    };
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
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={`${title}-skeleton-${index}`} className="px-4 py-2">
                <Skeleton className="h-5 w-36" />
              </div>
            ))
          : categories.map((category) => {
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
