import { getDynamicConfig } from '@/lib/statsig';

type IntlMessages = Record<string, unknown>;

function sanitizeMessageKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeMessageKeys(item));
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    return entries.reduce<Record<string, unknown>>((acc, [key, entryValue]) => {
      const sanitizedKey = key.replaceAll('.', '').trim();
      acc[sanitizedKey] = sanitizeMessageKeys(entryValue);
      return acc;
    }, {});
  }

  return value;
}

export async function getDynamicMessages(locale: string): Promise<IntlMessages> {
  // The key in Statsig should be 'translations', and locale is passed in user object
  const key = `translations`;
  const messages = await getDynamicConfig(key, { locale });
  if (!messages) {
    throw new Error(`No translations found for locale: ${locale}`);
  }

  const sanitizedMessages = sanitizeMessageKeys(messages);

  if (!sanitizedMessages || typeof sanitizedMessages !== 'object' || Array.isArray(sanitizedMessages)) {
    throw new Error(`Invalid translations payload for locale: ${locale}`);
  }

  return sanitizedMessages as IntlMessages;
}
