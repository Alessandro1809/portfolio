import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';

export const server = {
  sendContactEmail: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Valid email is required'),
      message: z.string().min(10, 'Message must be at least 10 characters'),
    }),
    handler: async ({ name, email, message }, context) => {
      console.log('[Action] Starting email send process');
      const resendApiKey = context.locals.resendApiKey;
      const contactEmail = context.locals.contactEmail;

      console.log('[Action] API Key present:', !!resendApiKey);
      console.log('[Action] Contact email:', contactEmail);

      if (!resendApiKey) {
        console.error('[Action] RESEND_API_KEY is missing');
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'RESEND_API_KEY is not configured',
        });
      }

      if (!contactEmail) {
        console.error('[Action] CONTACT_EMAIL is missing');
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'CONTACT_EMAIL is not configured',
        });
      }

      try {
        const resend = new Resend(resendApiKey);

        console.log('[Action] Sending email to:', contactEmail);
        const { data, error } = await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [contactEmail],
          replyTo: email,
          subject: `New contact from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">New Contact Form Submission</h2>
              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          `,
        });

        if (error) {
          console.error('[Action] Resend API error:', error);
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: error.message,
          });
        }

        console.log('[Action] Email sent successfully:', data);
        return { success: true, data };
      } catch (err) {
        console.error('[Action] Unexpected error:', err);
        throw err;
      }
    },
  }),
};