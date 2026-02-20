import { getDynamicConfig } from '@/lib/statsig';

export async function getDynamicMessages(locale: string) {
  // The key in Statsig should be 'translations', and locale is passed in user object
  const key = `translations`;
  const messages = await getDynamicConfig(key, { locale });
  if (!messages) {
    throw new Error(`No translations found for locale: ${locale}`);
  }
  return messages;
}
