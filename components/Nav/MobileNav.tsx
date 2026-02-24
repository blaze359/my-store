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
export default function MobileNav() {
  const [cats, setCats] = useState<Category[]>([]);
  const t = useTranslations('Nav');

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getCategories();
      setCats(categories);
    }
    fetchCategories();
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
              <MobileList title="Home" categories={homeCategory} categoryData={cats} />
            </AccordionItem>
            <AccordionItem value="electronics">
              <MobileList
                title="Electronics"
                categories={electronicsCategory}
                categoryData={cats}
              />
            </AccordionItem>
            <AccordionItem value="cosmetics">
              <MobileList title="Cosmetics" categories={cosmeticsCategory} categoryData={cats} />
            </AccordionItem>
            <AccordionItem value="fashion">
              <MobileList title="Fashion" categories={fashionCategory} categoryData={cats} />
            </AccordionItem>
            <AccordionItem value="automotive">
              <MobileList title="Automotive" categories={autoCategory} categoryData={cats} />
            </AccordionItem>
            <AccordionItem value="sports" className="py-4">
              <MobileList title="Sports" categories={sportsCategory} categoryData={cats} />
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
}: Readonly<{ title: string; categories: readonly string[]; categoryData?: Category[] }>) {
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
        {categories.map((category) => {
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
