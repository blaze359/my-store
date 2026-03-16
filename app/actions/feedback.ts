'use server';

import nodemailer from 'nodemailer';

export type FeedbackType = 'feedback' | 'enhancement';

export interface FeedbackFormData {
  type: FeedbackType;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SubmitFeedbackResult {
  success: boolean;
  error?: string;
}

export async function submitFeedback(
  data: FeedbackFormData
): Promise<SubmitFeedbackResult> {
  const { type, name, email, subject, message } = data;

  if (!name.trim() || !subject.trim() || !message.trim()) {
    return { success: false, error: 'Please fill in all required fields.' };
  }

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !EMAIL_RE.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.FEEDBACK_EMAIL) {
    console.error('Feedback email: missing required SMTP environment variables.');
    return { success: false, error: 'Email service is not configured. Please try again later.' };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const typeLabel = type === 'enhancement' ? 'Enhancement Idea' : 'Feedback';
  const sanitizedMessage = message
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('\n', '<br />');

  try {
    await transporter.sendMail({
      from: `"My Store Feedback" <${process.env.SMTP_USER}>`,
      to: process.env.FEEDBACK_EMAIL,
      replyTo: email || undefined,
      subject: `[My Store - ${typeLabel}] ${subject}`,
      text: `[My Store – mystore.com]\nType: ${typeLabel}\nName: ${name}\nEmail: ${email || 'Not provided'}\n\n${message}`,
      html: `
        <p style="font-size:12px;color:#888;margin:0 0 12px;">Submitted via <strong>My Store</strong> — mystore.com</p>
        <h2 style="color:#333;margin:0 0 8px;">${typeLabel}</h2>
        <p><strong>From:</strong> ${name}${email ? ` &lt;${email}&gt;` : ''}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
        <p>${sanitizedMessage}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0 8px;" />
        <p style="font-size:11px;color:#aaa;">This message was sent from the feedback form at mystore.com.</p>
      `,
    });

    return { success: true };
  } catch (err: unknown) {
    console.error('Feedback email send error:', err);

    const isAuthError =
      typeof err === 'object' &&
      err !== null &&
      'code' in err &&
      (err as { code?: string }).code === 'EAUTH';

    if (isAuthError) {
      return {
        success: false,
        error:
          'SMTP login failed. If you are using Gmail, enable 2-Step Verification and use a Google App Password for SMTP_PASS (not your normal Gmail password).',
      };
    }

    return { success: false, error: 'Failed to send feedback. Please try again.' };
  }
}
