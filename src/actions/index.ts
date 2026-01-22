import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';

const CONTACT_FROM = 'Alessandro Diaz <contact@alessandrodiaz.dev>';
const UPDATES_FROM = 'Alessandro Diaz <updates@alessandrodiaz.dev>';

const normalizeEmail = (value: string) => value.trim().toLowerCase();

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const sanitizeSubject = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

const getSiteUrl = (context: any) => {
  const explicit = context.locals.siteUrl;
  if (explicit) return explicit.replace(/\/$/, '');
  if (context.request?.url) return new URL(context.request.url).origin;
  const origin = context.request?.headers.get('origin');
  if (origin) return origin.replace(/\/$/, '');
  const host = context.request?.headers.get('x-forwarded-host') ?? context.request?.headers.get('host');
  if (host) {
    const proto = context.request?.headers.get('x-forwarded-proto') ?? 'https';
    return `${proto}://${host}`.replace(/\/$/, '');
  }
  return '';
};

const requireResend = (context: any) => {
  const resendApiKey = context.locals.resendApiKey;
  if (!resendApiKey) {
    throw new ActionError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'RESEND_API_KEY is not configured',
    });
  }
  return new Resend(resendApiKey);
};

const requireAudienceId = (context: any) => {
  const audienceId = context.locals.resendAudienceId;
  if (!audienceId) {
    throw new ActionError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'RESEND_AUDIENCE_ID is not configured',
    });
  }
  return audienceId;
};

const buildContactEmail = ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');
  const receivedAt = new Date().toISOString();

  return {
    subject: sanitizeSubject(`New contact request from ${name}`),
    text: `New contact request\n\nName: ${name}\nEmail: ${email}\nReceived: ${receivedAt}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2933;">
        <h2 style="font-size: 20px; margin-bottom: 8px;">New contact request</h2>
        <p style="margin: 0 0 16px;">A visitor submitted the contact form.</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600; width: 120px;">Name</td>
            <td style="padding: 8px 0;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Email</td>
            <td style="padding: 8px 0;">${safeEmail}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Received</td>
            <td style="padding: 8px 0;">${receivedAt}</td>
          </tr>
        </table>
        <div style="border: 1px solid #e5e7eb; background: #f9fafb; padding: 16px; border-radius: 8px;">
          <p style="margin: 0 0 8px; font-weight: 600;">Message</p>
          <p style="margin: 0; line-height: 1.6;">${safeMessage}</p>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #6b7280;">This message was sent from the portfolio contact form.</p>
      </div>
    `,
  };
};

const buildSubscriptionEmail = ({
  unsubscribeUrl,
  locale,
}: {
  unsubscribeUrl: string;
  locale: 'en' | 'es';
}) => {
  if (locale === 'es') {
    return {
      subject: 'Suscripcion confirmada',
      text: `Hola,\n\nGracias por suscribirte a las actualizaciones del blog. A partir de ahora recibiras nuevas publicaciones y anuncios relevantes.\n\nPuedes darte de baja en cualquier momento aqui: ${unsubscribeUrl}\n\nAtentamente,\nAlessandro Diaz`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2933;">
          <h2 style="font-size: 20px; margin-bottom: 8px;">Suscripcion confirmada</h2>
          <p style="margin: 0 0 16px;">Gracias por suscribirte a las actualizaciones del blog. A partir de ahora recibiras nuevas publicaciones y anuncios relevantes.</p>
          <div style="border: 1px solid #e5e7eb; background: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0 0 8px; font-weight: 600;">Gestion de suscripcion</p>
            <p style="margin: 0;">Puedes darte de baja en cualquier momento usando este enlace:</p>
            <p style="margin: 8px 0 0;"><a href="${unsubscribeUrl}" style="color: #0f766e; text-decoration: underline;">Darse de baja</a></p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #6b7280;">Si no solicitaste esta suscripcion, ignora este mensaje.</p>
          <p style="margin-top: 12px; font-size: 14px;">Atentamente,<br />Alessandro Diaz</p>
        </div>
      `,
    };
  }

  return {
    subject: 'Subscription confirmed',
    text: `Hello,\n\nThank you for subscribing to the blog updates. You will receive new posts and relevant announcements.\n\nYou can unsubscribe at any time here: ${unsubscribeUrl}\n\nBest regards,\nAlessandro Diaz`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2933;">
        <h2 style="font-size: 20px; margin-bottom: 8px;">Subscription confirmed</h2>
        <p style="margin: 0 0 16px;">Thank you for subscribing to the blog updates. You will receive new posts and relevant announcements.</p>
        <div style="border: 1px solid #e5e7eb; background: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 0 0 8px; font-weight: 600;">Subscription management</p>
          <p style="margin: 0;">You can unsubscribe at any time using this link:</p>
          <p style="margin: 8px 0 0;"><a href="${unsubscribeUrl}" style="color: #0f766e; text-decoration: underline;">Unsubscribe</a></p>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #6b7280;">If you did not request this subscription, please ignore this email.</p>
        <p style="margin-top: 12px; font-size: 14px;">Best regards,<br />Alessandro Diaz</p>
      </div>
    `,
  };
};

const buildUnsubscribeEmail = ({ locale }: { locale: 'en' | 'es' }) => {
  if (locale === 'es') {
    return {
      subject: 'Suscripcion cancelada',
      text: `Hola,\n\nTu suscripcion ha sido cancelada correctamente. Si cambias de opinion, puedes volver a suscribirte desde el blog.\n\nAtentamente,\nAlessandro Diaz`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2933;">
          <h2 style="font-size: 20px; margin-bottom: 8px;">Suscripcion cancelada</h2>
          <p style="margin: 0 0 16px;">Tu suscripcion ha sido cancelada correctamente. Si cambias de opinion, puedes volver a suscribirte desde el blog.</p>
          <p style="margin-top: 12px; font-size: 14px;">Atentamente,<br />Alessandro Diaz</p>
        </div>
      `,
    };
  }

  return {
    subject: 'Subscription cancelled',
    text: `Hello,\n\nYour subscription has been cancelled successfully. If you change your mind, you can resubscribe from the blog.\n\nBest regards,\nAlessandro Diaz`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2933;">
        <h2 style="font-size: 20px; margin-bottom: 8px;">Subscription cancelled</h2>
        <p style="margin: 0 0 16px;">Your subscription has been cancelled successfully. If you change your mind, you can resubscribe from the blog.</p>
        <p style="margin-top: 12px; font-size: 14px;">Best regards,<br />Alessandro Diaz</p>
      </div>
    `,
  };
};

export const server = {
  sendContactEmail: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Valid email is required'),
      message: z.string().min(10, 'Message must be at least 10 characters'),
    }),
    handler: async ({ name, email, message }, context) => {
      const resend = requireResend(context);
      const contactEmail = context.locals.contactEmail;

      if (!contactEmail) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'CONTACT_EMAIL is not configured',
        });
      }

      const emailContent = buildContactEmail({ name, email, message });
      const { error } = await resend.emails.send({
        from: CONTACT_FROM,
        to: [contactEmail],
        replyTo: email,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      });

      if (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message,
        });
      }

      return { success: true };
    },
  }),
  subscribeToBlog: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email('Valid email is required'),
    }),
    handler: async ({ email }, context) => {
      const resend = requireResend(context);
      const audienceId = requireAudienceId(context);
      const normalizedEmail = normalizeEmail(email);
      const locale = context.locals.lang === 'es' ? 'es' : 'en';
      const siteUrl = getSiteUrl(context);
      if (!siteUrl) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'SITE_URL is not configured',
        });
      }
      const unsubscribeUrl = `${siteUrl}/unsubscribe?email=${encodeURIComponent(normalizedEmail)}`;

      let isNew = false;
      let wasUnsubscribed = false;

      const createResponse = await resend.contacts.create({
        audienceId,
        email: normalizedEmail,
      });

      if (createResponse.error) {
        const message = createResponse.error.message.toLowerCase();
        if (!message.includes('already')) {
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: createResponse.error.message,
          });
        }

        const existingContact = await resend.contacts.get({
          audienceId,
          email: normalizedEmail,
        });

        if (existingContact.error) {
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: existingContact.error.message,
          });
        }

        wasUnsubscribed = Boolean(existingContact.data?.unsubscribed);

        if (wasUnsubscribed) {
          const updateResponse = await resend.contacts.update({
            audienceId,
            email: normalizedEmail,
            unsubscribed: false,
          });

          if (updateResponse.error) {
            throw new ActionError({
              code: 'BAD_REQUEST',
              message: updateResponse.error.message,
            });
          }
        } else {
          return { success: true, status: 'already' };
        }
      } else {
        isNew = true;
      }

      const emailContent = buildSubscriptionEmail({
        unsubscribeUrl,
        locale,
      });

      const sendResult = await resend.emails.send({
        from: UPDATES_FROM,
        to: [normalizedEmail],
        replyTo: context.locals.contactEmail ?? undefined,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
        headers: {
          'List-Unsubscribe': `<${unsubscribeUrl}>`,
        },
      });

      if (sendResult.error) {
        if (isNew) {
          await resend.contacts.remove({
            audienceId,
            email: normalizedEmail,
          });
        } else if (wasUnsubscribed) {
          await resend.contacts.update({
            audienceId,
            email: normalizedEmail,
            unsubscribed: true,
          });
        }

        throw new ActionError({
          code: 'BAD_REQUEST',
          message: sendResult.error.message,
        });
      }

      if (wasUnsubscribed) {
        return { success: true, status: 'resubscribed' };
      }

      return { success: true, status: 'subscribed' };
    },
  }),
  unsubscribeFromBlog: defineAction({
    accept: 'form',
    input: z
      .object({
        email: z.string().email('Valid email is required'),
      })
      .strict(),
    handler: async ({ email }, context) => {
      const locale = context.locals.lang === 'es' ? 'es' : 'en';
      const resend = requireResend(context);
      const audienceId = requireAudienceId(context);
      const normalizedEmail = normalizeEmail(email);

      const contactResult = await resend.contacts.get({
        audienceId,
        email: normalizedEmail,
      });

      if (contactResult.error) {
        const message = contactResult.error.message.toLowerCase();
        if (message.includes('not found')) {
          return { success: true, status: 'not_found' };
        }
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: contactResult.error.message,
        });
      }

      if (contactResult.data?.unsubscribed) {
        return { success: true, status: 'already' };
      }

      const updateResult = await resend.contacts.update({
        audienceId,
        email: normalizedEmail,
        unsubscribed: true,
      });

      if (updateResult.error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: updateResult.error.message,
        });
      }

      if (context.locals.resendApiKey) {
        const emailContent = buildUnsubscribeEmail({ locale });
        const { error } = await resend.emails.send({
          from: UPDATES_FROM,
          to: [normalizedEmail],
          replyTo: context.locals.contactEmail ?? undefined,
          subject: emailContent.subject,
          html: emailContent.html,
          text: emailContent.text,
        });

        if (error) {
          console.warn('[Action] Unsubscribe confirmation email failed');
        }
      }

      return { success: true, status: 'unsubscribed' };
    },
  }),
};
