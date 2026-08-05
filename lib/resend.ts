import nodemailer from "nodemailer";

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export async function sendContactNotification(data: ContactEmailData) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const adminEmail = process.env.ADMIN_EMAIL || "nextgentech2112@gmail.com";

  if (!gmailUser || !gmailAppPassword) {
    console.log("📧 Gmail SMTP not configured — email skipped. Lead data:", data);
    return { success: true, skipped: true };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  const htmlContent = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #12121a; color: #e8e8f0; padding: 32px; border-radius: 16px;">
      <h1 style="color: #a78bfa; font-size: 24px; margin-bottom: 24px;">🚀 New Contact Form Submission</h1>
      <div style="background: rgba(255,255,255,0.05); padding: 24px; border-radius: 12px; margin-bottom: 16px;">
        <p><strong style="color: #06b6d4;">Name:</strong> ${data.name}</p>
        <p><strong style="color: #06b6d4;">Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong style="color: #06b6d4;">Phone:</strong> ${data.phone}</p>` : ""}
        ${data.service ? `<p><strong style="color: #06b6d4;">Service Interested:</strong> ${data.service}</p>` : ""}
      </div>
      <div style="background: rgba(255,255,255,0.05); padding: 24px; border-radius: 12px;">
        <p><strong style="color: #06b6d4;">Message:</strong></p>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
      <p style="margin-top: 24px; font-size: 12px; color: #6b6b80;">Sent from NextGen Tech website contact form</p>
    </div>
  `;

  try {
    const result = await transporter.sendMail({
      from: `"NextGen Tech Website" <${gmailUser}>`,
      to: adminEmail,
      replyTo: data.email,
      subject: `New Lead: ${data.name} — ${data.service || "General Inquiry"}`,
      html: htmlContent,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to send email via Gmail:", error);
    return { success: false, error };
  }
}
