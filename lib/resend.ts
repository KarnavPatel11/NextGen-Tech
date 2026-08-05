import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export async function sendContactNotification(data: ContactEmailData) {
  if (!resend) {
    console.log("📧 Resend not configured — email skipped. Lead data:", data);
    return { success: true, skipped: true };
  }

  try {
    const result = await resend.emails.send({
      from: "NextGen Tech <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL || "nextgentech22@gmail.com",
      subject: `New Lead: ${data.name} — ${data.service || "General Inquiry"}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #12121a; color: #e8e8f0; padding: 32px; border-radius: 16px;">
          <h1 style="color: #a78bfa; font-size: 24px; margin-bottom: 24px;">New Contact Form Submission</h1>
          <div style="background: rgba(255,255,255,0.05); padding: 24px; border-radius: 12px; margin-bottom: 16px;">
            <p><strong style="color: #06b6d4;">Name:</strong> ${data.name}</p>
            <p><strong style="color: #06b6d4;">Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong style="color: #06b6d4;">Phone:</strong> ${data.phone}</p>` : ""}
            ${data.service ? `<p><strong style="color: #06b6d4;">Service:</strong> ${data.service}</p>` : ""}
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 24px; border-radius: 12px;">
            <p><strong style="color: #06b6d4;">Message:</strong></p>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #6b6b80;">Sent from NextGen Tech contact form</p>
        </div>
      `,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
