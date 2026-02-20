import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { getDynamicMessages } from './dynamicMessages';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }

  const messages = await getDynamicMessages(locale);

  return {
    locale,
    messages,
  };
});
