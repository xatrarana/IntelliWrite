import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Confirm your email address',
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`,
      });

}