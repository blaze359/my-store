import { getTranslations } from 'next-intl/server';

export default async function About() {
  const t = await getTranslations('About');
  return (
    <div className="my-6">
      <h1 className="font-black text-4xl mb-4">{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
