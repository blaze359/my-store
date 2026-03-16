import FeedbackForm from '@/components/FeedbackForm';
import { getTranslations } from 'next-intl/server';

export default async function FeedbackPage() {
  const t = await getTranslations('Feedback');
  return (
    <div className="my-6 max-w-xl">
      <h1 className="mb-2 text-4xl font-black">{t('Feedback')}</h1>
      <p className="mb-8 text-muted-foreground">{t('FeedbackHeader')}</p>
      <FeedbackForm />
    </div>
  );
}
