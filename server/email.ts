import { Resend } from 'resend';

const ADMIN_EMAIL = "info@jecigroup.com";
const FROM_EMAIL = "JECI Group <info@jecigroup.com>";

async function getResendClient(): Promise<Resend> {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error('Resend auth token not available');
  }

  const connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || !connectionSettings.settings.api_key) {
    throw new Error('Resend not connected');
  }

  return new Resend(connectionSettings.settings.api_key);
}

interface BookingEmailData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceName: string;
  serviceCategory: string;
  date: string;
  time: string;
  totalAmount: number;
  businessName?: string;
  businessType?: string;
  description?: string;
  addOns?: { name: string; price: number }[];
}

export async function sendBookingConfirmationEmail(data: BookingEmailData) {
  try {
    const resend = await getResendClient();

    const addOnsHtml = data.addOns && data.addOns.length > 0
      ? `<tr><td style="padding:12px 16px;color:#64748b;font-size:14px;">Add-Ons</td><td style="padding:12px 16px;font-weight:600;">${data.addOns.map(a => `${a.name} (+$${a.price})`).join(', ')}</td></tr>`
      : '';

    const clientHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Inter',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="background:#0f172a;padding:32px;text-align:center;">
      <h1 style="color:#d97706;font-size:28px;margin:0;">JECI GROUP</h1>
      <p style="color:#94a3b8;font-size:12px;letter-spacing:3px;margin:8px 0 0;">CONSULTING & FINANCIAL SERVICES</p>
    </div>
    <div style="background:white;padding:40px 32px;">
      <h2 style="color:#0f172a;font-size:24px;margin:0 0 8px;">Booking Confirmed!</h2>
      <p style="color:#64748b;font-size:16px;line-height:1.6;margin:0 0 24px;">
        Hi ${data.clientName}, your appointment with JECI Group has been confirmed. Here are your details:
      </p>
      <table style="width:100%;border-collapse:collapse;background:#f8fafc;border-radius:8px;overflow:hidden;">
        <tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:12px 16px;color:#64748b;font-size:14px;">Service</td><td style="padding:12px 16px;font-weight:600;color:#0f172a;">${data.serviceName}</td></tr>
        <tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:12px 16px;color:#64748b;font-size:14px;">Category</td><td style="padding:12px 16px;font-weight:600;">${data.serviceCategory}</td></tr>
        <tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:12px 16px;color:#64748b;font-size:14px;">Date</td><td style="padding:12px 16px;font-weight:600;">${data.date}</td></tr>
        <tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:12px 16px;color:#64748b;font-size:14px;">Time</td><td style="padding:12px 16px;font-weight:600;">${data.time} EST</td></tr>
        ${addOnsHtml}
        <tr><td style="padding:12px 16px;color:#64748b;font-size:14px;">Total</td><td style="padding:12px 16px;font-weight:700;color:#d97706;font-size:18px;">$${data.totalAmount}</td></tr>
      </table>
      <div style="margin-top:32px;padding:20px;background:#fefce8;border-left:4px solid #d97706;">
        <p style="margin:0;color:#0f172a;font-size:14px;font-weight:600;">What's Next?</p>
        <p style="margin:8px 0 0;color:#64748b;font-size:14px;line-height:1.5;">
          A team member will reach out with your Zoom meeting link and any preparation materials before your appointment.
        </p>
      </div>
      <div style="margin-top:32px;text-align:center;">
        <p style="color:#64748b;font-size:13px;">Questions? Contact us at <a href="mailto:info@jecigroup.com" style="color:#d97706;">info@jecigroup.com</a> or call <a href="tel:202-430-5058" style="color:#d97706;">202-430-5058</a></p>
      </div>
    </div>
    <div style="text-align:center;padding:24px;">
      <p style="color:#94a3b8;font-size:12px;margin:0;">80 M St SE, Washington, DC | jecigroup.com</p>
    </div>
  </div>
</body>
</html>`;

    const adminHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Inter',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="background:#0f172a;padding:24px;text-align:center;">
      <h1 style="color:#d97706;font-size:22px;margin:0;">New Booking Received</h1>
    </div>
    <div style="background:white;padding:32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:10px 12px;color:#64748b;font-size:13px;width:130px;">Client</td><td style="padding:10px 12px;font-weight:600;color:#0f172a;">${data.clientName}</td></tr>
        <tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:10px 12px;color:#64748b;font-size:13px;">Email</td><td style="padding:10px 12px;"><a href="mailto:${data.clientEmail}" style="color:#d97706;">${data.clientEmail}</a></td></tr>
        <tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:10px 12px;color:#64748b;font-size:13px;">Phone</td><td style="padding:10px 12px;"><a href="tel:${data.clientPhone}" style="color:#d97706;">${data.clientPhone}</a></td></tr>
        ${data.businessName ? `<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:10px 12px;color:#64748b;font-size:13px;">Business</td><td style="padding:10px 12px;">${data.businessName}</td></tr>` : ''}
        ${data.businessType ? `<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:10px 12px;color:#64748b;font-size:13px;">Business Type</td><td style="padding:10px 12px;">${data.businessType}</td></tr>` : ''}
        <tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:10px 12px;color:#64748b;font-size:13px;">Service</td><td style="padding:10px 12px;font-weight:600;">${data.serviceName}</td></tr>
        <tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:10px 12px;color:#64748b;font-size:13px;">Category</td><td style="padding:10px 12px;">${data.serviceCategory}</td></tr>
        <tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:10px 12px;color:#64748b;font-size:13px;">Date</td><td style="padding:10px 12px;font-weight:600;">${data.date}</td></tr>
        <tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:10px 12px;color:#64748b;font-size:13px;">Time</td><td style="padding:10px 12px;font-weight:600;">${data.time} EST</td></tr>
        ${addOnsHtml}
        <tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:10px 12px;color:#64748b;font-size:13px;">Total</td><td style="padding:10px 12px;font-weight:700;color:#d97706;font-size:16px;">$${data.totalAmount}</td></tr>
        ${data.description ? `<tr><td style="padding:10px 12px;color:#64748b;font-size:13px;">Notes</td><td style="padding:10px 12px;color:#475569;">${data.description}</td></tr>` : ''}
      </table>
    </div>
  </div>
</body>
</html>`;

    const [clientResult, adminResult] = await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: data.clientEmail,
        subject: `Booking Confirmed: ${data.serviceName} — JECI Group`,
        html: clientHtml,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Booking: ${data.serviceName} — ${data.clientName}`,
        html: adminHtml,
      }),
    ]);

    console.log("Booking emails sent:", { clientResult, adminResult });
    return { success: true, clientResult, adminResult };
  } catch (error) {
    console.error("Failed to send booking emails:", error);
    return { success: false, error };
  }
}
