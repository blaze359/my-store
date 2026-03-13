import ConfirmationContent from '@/components/confirmation/ConfirmationContent';
import ConfirmationGuard from '@/components/confirmation/ConfirmationGuard';
import { getTranslations } from 'next-intl/server';

export default async function ConfirmationPage({ params }: { readonly params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = await getTranslations('Confirmation');

  return (
    <ConfirmationGuard>
      <ConfirmationContent orderSlug={slug} title={t('Order Confirmation')} />
    </ConfirmationGuard>
  );
}
