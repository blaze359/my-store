'use client';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { getCategories } from '@/app/actions/api';
import { Category } from '@/lib/productTypes';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import {
  homeCategory,
  cosmeticsCategory,
  electronicsCategory,
  fashionCategory,
  autoCategory,
  sportsCategory,
} from '@/lib/constants';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '../ui/sheet';
import Link from 'next/link';
import Search from './Search';
import { useTranslations } from 'next-intl';
import { Skeleton } from '../ui/skeleton';
export default function MobileNav() {
  const [cats, setCats] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('Nav');

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
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <FontAwesomeIcon icon={faBars} className="md:hidden py-2 px-4" />
        </SheetTrigger>
        <SheetContent side="left" className="w-full p-6">
          <SheetTitle className="font-black text-2xl md:text-4xl mb-4">{t('Menu')}</SheetTitle>
          <Search />
          <Accordion type="single" collapsible className="w-full mt-4">
            <AccordionItem value="home">
              <MobileList
                title="Home"
                categories={homeCategory}
                categoryData={cats}
                isLoading={isLoading}
              />
            </AccordionItem>
            <AccordionItem value="electronics">
              <MobileList
                title="Electronics"
                categories={electronicsCategory}
                categoryData={cats}
                isLoading={isLoading}
              />
            </AccordionItem>
            <AccordionItem value="cosmetics">
              <MobileList
                title="Cosmetics"
                categories={cosmeticsCategory}
                categoryData={cats}
                isLoading={isLoading}
              />
            </AccordionItem>
            <AccordionItem value="fashion">
              <MobileList
                title="Fashion"
                categories={fashionCategory}
                categoryData={cats}
                isLoading={isLoading}
              />
            </AccordionItem>
            <AccordionItem value="automotive">
              <MobileList
                title="Automotive"
                categories={autoCategory}
                categoryData={cats}
                isLoading={isLoading}
              />
            </AccordionItem>
            <AccordionItem value="sports" className="py-4">
              <MobileList
                title="Sports"
                categories={sportsCategory}
                categoryData={cats}
                isLoading={isLoading}
              />
            </AccordionItem>
            <AccordionItem value="about" className="py-4">
              <MobileList
                title="About"
                categories={['about']}
                categoryData={[
                  {
                    slug: 'about',
                    name: 'About This Site',
                    url: '',
                  },
                ]}
                isLoading={false}
              />
            </AccordionItem>
            <AccordionItem value="about-todo" className="py-4">
              <MobileList
                title="To-Do List"
                categories={['about/to-do-list']}
                categoryData={[
                  {
                    slug: 'about/to-do-list',
                    name: 'To-Do List',
                    url: '',
                  },
                ]}
                isLoading={false}
              />
            </AccordionItem>
          </Accordion>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function MobileList({
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
      <SheetClose asChild className="">
        <Link
          href={`${cat?.slug.includes('about') ? '' : '/products'}/${cat?.slug}`}
          title={cat?.name}
          className=""
        >
          {t(cat.name)}
        </Link>
      </SheetClose>
    );
  }

  return (
    <>
      <AccordionTrigger>{t(title)}</AccordionTrigger>
      <AccordionContent className="bg-white">
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
                  <SheetClose asChild key={category}>
                    <Link
                      href={`/products/${cat.slug}`}
                      title={cat.name}
                      className="block px-4 py-2 hover:font-bold w-45"
                    >
                      {t(cat.name)}
                    </Link>
                  </SheetClose>
                );
              }
            })}
      </AccordionContent>
    </>
  );
}
