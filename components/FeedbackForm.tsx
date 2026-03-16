'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { submitFeedback, type FeedbackType } from '@/app/actions/feedback';
import { useTranslations } from 'next-intl';

interface FormState {
  type: FeedbackType;
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  type: 'feedback',
  name: '',
  email: '',
  subject: '',
  message: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FeedbackForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const t = useTranslations('Feedback');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'email') setEmailError('');
  }

  function handleEmailBlur() {
    if (form.email && !EMAIL_RE.test(form.email)) {
      setEmailError(t('InvalidEmail'));
    } else {
      setEmailError('');
    }
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (form.email && !EMAIL_RE.test(form.email)) {
      setEmailError(t('InvalidEmail'));
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const result = await submitFeedback(form);

    if (result.success) {
      setStatus('success');
      setForm(INITIAL_STATE);
    } else {
      setStatus('error');
      setErrorMessage(result.error ?? t('SomethingWentWrong'));
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-950">
        <p className="text-lg font-semibold text-green-800 dark:text-green-200">
          {t('ThankYou')}

        </p>
        <p className="mt-1 text-sm text-green-700 dark:text-green-300">
          {t('WeAppreciate')}
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setStatus('idle')}
        >
          {t('SubmitAnother')}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Type */}
      <div>
        <fieldset>
          <legend className="mb-1.5 block text-sm font-medium">
            {t('Type')}{' '}
            <span aria-hidden="true" className="text-red-500">
              *
            </span>
          </legend>
          <div className="flex gap-6">
            {(['feedback', 'enhancement'] as const).map((opt) => (
              <label key={opt} className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="type"
                  value={opt}
                  checked={form.type === opt}
                  onChange={handleChange}
                  className="accent-primary"
                />
                {opt === 'feedback' ? t('Feedback') : t('EnhancementIdea')}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="fb-name" className="mb-1.5 block text-sm font-medium">
          {t('Name')}{' '}
          <span aria-hidden="true" className="text-red-500">
            *
          </span>
        </label>
        <input
          id="fb-name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          placeholder={t('YourName')}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="fb-email" className="mb-1.5 block text-sm font-medium">
          {t('Email')}{' '}
          <span className="text-muted-foreground text-xs font-normal">
            ({t('OptionalFollowUp')})
          </span>
        </label>
        <input
          id="fb-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleEmailBlur}
          placeholder={t('EmailPlaceholder')}
          aria-describedby={emailError ? 'fb-email-error' : undefined}
          aria-invalid={!!emailError}
          className={`w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] ${
            emailError ? 'border-red-500 aria-invalid:border-red-500' : 'border-input'
          }`}
        />
        {emailError && (
          <p
            id="fb-email-error"
            role="alert"
            className="mt-1 text-xs text-red-600 dark:text-red-400"
          >
            {emailError}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="fb-subject" className="mb-1.5 block text-sm font-medium">
          {t('Subject')}{' '}
          <span aria-hidden="true" className="text-red-500">
            *
          </span>
        </label>
        <input
          id="fb-subject"
          name="subject"
          type="text"
          required
          value={form.subject}
          onChange={handleChange}
          placeholder={form.type === 'enhancement' ? t('EnhancementSubject') : t('FeedbackSubject')}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="fb-message" className="mb-1.5 block text-sm font-medium">
          {form.type === 'enhancement' ? t('DescribeYourIdea') : t('Message')}{' '}
          <span aria-hidden="true" className="text-red-500">
            *
          </span>
        </label>
        <textarea
          id="fb-message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={handleChange}
          placeholder={form.type === 'enhancement' ? t('EnhancementMessage') : t('FeedbackMessage')}
          className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        />
      </div>

      {status === 'error' && (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
        >
          {errorMessage}
        </p>
      )}

      <Button type="submit" disabled={status === 'submitting'} size="lg">
        {status === 'submitting' ? t('Sending') : t('SendFeedback')}
      </Button>
    </form>
  );
}
